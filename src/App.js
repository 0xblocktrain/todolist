import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'

function App() {

  const { address } = useAccount()

	return (
    <div className="flex flex-col justify-center items-center bg-black text-white">
      <div className="flex items-center justify-between w-full px-4 py-2">
        <p className="text-xl font-bold">Todo-List</p>
        {
          address && (
            <ConnectButton />
          )
        }
      </div>
      <div style={{ minHeight: '95vh' }} className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-4xl font-extrabold">Todo List</h1>
        {
          !address && (
            <ConnectButton />
          )
        }
      </div>
    </div>
	);
}

export default App;
