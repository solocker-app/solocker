import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  digitalAssetSelectors,
  getDigitalAssetsByOwner,
} from "@/store/slices/digitalAsset";
import {
  getTokenVestingByOwner,
  tokenVestingSelectors,
} from "@/store/slices/tokenVesting";

export default function useInitailizeTokenLock() {
  const dispatch = useAppDispatch();
  const { publicKey } = useWallet();
  const { loadingState, ...digitalAsset } = useAppSelector(
    (state) => state.digitalAsset,
  );
  const digitalAssets = digitalAssetSelectors.selectAll(digitalAsset);

  const { loadingState: lockedTokenLoadingState, ...tokenVesting } =
    useAppSelector((state) => state.tokenVesting);
  const lockedTokens = tokenVestingSelectors.selectAll(tokenVesting);

  useEffect(() => {
    dispatch(getDigitalAssetsByOwner(publicKey.toBase58()))
      .unwrap()
      .catch(console.log);
  }, []);

  useEffect(() => {
    dispatch(getTokenVestingByOwner(publicKey.toBase58()))
      .unwrap()
      .catch(console.log);
  }, []);

  return {
    digitalAssets,
    digitalAssetLoadingState: loadingState,
    lockedTokens,
    lockedTokenLoadingState,
  };
}
