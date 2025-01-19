import { Toaster } from "react-hot-toast";
import { Encrypter } from "./components/encrypter";
import { Decrypter } from "./components/decrypter";

export default function Home() {
	return (
		<main className="flex justify-center items-center h-dvh gap-4 p-5 bg-slate-50">
			<Encrypter />
			<Decrypter />
			<Toaster />
		</main>
	);
}
