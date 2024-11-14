import React from "react";
import { useDispatch } from "react-redux";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { ClaimButton } from "./components";

export const Claim: React.FC = () => {
  const dispatch = useDispatch();

  const address = useTonAddress();

  return (
    <div className="mt-4">
      {address ? <ClaimButton /> : <TonConnectButton />}
    </div>
  );
};
