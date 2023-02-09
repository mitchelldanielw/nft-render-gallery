import { ThirdwebNftMedia, useContract, useContractMetadata, useNFTs } from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  const { contract } = useContract('0xaFf593c5d6787C233a1EE0A81489eA804D1D2331');
  const { data: nfts, isLoading } = useNFTs(contract);
  const { data: metadata, isLoading: loadingMetadata } = useContractMetadata(contract);
  const truncateAddress = (address: string) => {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  };

  return (
    <main className="container">
      {!loadingMetadata &&
        <header className="heading">
          <div>
            <img
              src={metadata?.image}
              alt="NFT Collection Thumbnail"
              width={45}
            />
            <h1>{metadata?.name}</h1>
            <h2 className="description">{metadata?.description}</h2>
          </div>
        </header>
      }

      {!isLoading ?
      (<div className="grid">
        {nfts?.map(e =>
          <div className="card">
            <p>{metadata?.name}&nbsp;#{e.metadata.id}</p>
            <div className="image">
              <ThirdwebNftMedia metadata={e.metadata} key={e.metadata.id} />
            </div>
            <p>owned by&nbsp;{truncateAddress(e.owner)}</p>
          </div>
        )}
      </div>)
      : (<p className="loading">Loading...</p>) }
    </main>
  );
}