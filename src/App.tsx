import { FC } from "react";
import Home from "screen/Home";

const App: FC = () => {
	return (
		<>
			<div className="font-extrabold text-2xl  md:text-7xl my-4 mx-auto flex justify-center">
				Map Distance
			</div>
			<Home />
		</>
	);
};

export default App;
