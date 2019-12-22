import React, { useEffect, useState } from "react";
import {
  Button,
  Alert,
  Spinner,
  ProgressBar,
  Callout
} from "@blueprintjs/core";

import InfoPanel from "./InfoPanel";
import { Api, InfoProps } from "./types";
import { showToast } from "../../plumbing";
import { getWeb3 } from "./getWeb3";

import ButtonABI from "./Button.json";
import { Log } from "web3-core";

const ButtonAddress = "0x4D83de30Ba3c1779288adda0f1C6078Ac7c3238f";

const TheButton: React.FC = () => {
  const [api, setApi] = useState<Api>();
  const [info, setInfo] = useState<InfoProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [event, setEvent] = useState<string>();

  useEffect(() => {
    let web3: Api["web3"];

    getWeb3()
      .then(result => (web3 = result), setError)
      .then(async () => {
        const [account] = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(ButtonABI, ButtonAddress);
        setApi({
          web3,
          account,
          contract
        });

        web3.eth.subscribe("newBlockHeaders", (_, block) => {
          console.info(block);
          setEvent(block.hash);
          showToast(`New block #${block.number}`, { icon: "code-block" });
        });

        contract.events.allEvents((_: Error, { transactionHash }: Log) => {
          setEvent(transactionHash);
          showToast("Something happened!", {
            intent: "warning",
            icon: "warning-sign"
          });
        });
      });

    return () => {
      if (web3) {
        web3.eth.clearSubscriptions(() => true);
      }
    };
  }, []);

  useEffect(() => {
    if (api) {
      const m = "COST,WAIT_TIME,expired,lastParticipant,age".split(",");
      Promise.all(m.map(method => api.contract.methods[method]().call())).then(
        ([cost, waitTime, expired, lastParticipant, age]) => {
          const i = {
            cost,
            ethCost: `${api.web3.utils.fromWei(cost, "ether")} ETH`,
            age: Number(age),
            waitTime: Number(waitTime),
            expired,
            lastParticipant,
            isYou: lastParticipant === api.account
          };
          setInfo(i);
        }
      );
    }
  }, [api, event]);

  const canClaim = info?.expired && info.isYou;

  const handleClick = async () => {
    const { contract, account: from } = api!;

    setLoading(true);

    try {
      if (canClaim) {
        await contract.methods.claim_treasure().send({ from });
        showToast("You got the prize!", {
          intent: "success",
          icon: "download"
        });
        setLoading(false);
        return;
      }
      await contract.methods.press_button().send({ from, value: info!.cost });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const progressValue = info && info.age / (info.waitTime + 1);
  const gameAfoot = info?.isYou && Number(progressValue) < 1;
  const gameLost = info?.expired && !info.isYou;

  return (
    <>
      <Alert
        intent="danger"
        isOpen={!!error}
        onConfirm={() => setError(undefined)}
      >
        {error && error.message}
      </Alert>

      {info && (
        <>
          {gameAfoot ? (
            <Callout
              title={`Please wait ${info.waitTime} blocks`}
              intent="primary"
            >
              <p>If nobody else clicks the button during that time, you win.</p>
              <ProgressBar value={progressValue} />
            </Callout>
          ) : (
            <Button
              large
              disabled={loading || gameLost}
              onClick={handleClick}
              intent={canClaim ? "success" : "none"}
              icon={loading && <Spinner size={Spinner.SIZE_SMALL} />}
            >
              {loading
                ? "Standby..."
                : canClaim
                ? "Click to claim!"
                : gameLost
                ? "Winner must claim"
                : "Click to play!"}
            </Button>
          )}
          <InfoPanel {...info} />
        </>
      )}
    </>
  );
};

export default TheButton;
