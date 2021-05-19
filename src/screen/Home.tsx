import { FC, useState } from "react";
import { Input, Button, Map, Spinner } from "components";
import axios from "axios";

const Home: FC = () => {
	const [data, setData] = useState({
		origin: "",
		destination: "",
	});
	const [response, setResponse] = useState<any>(null);
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const { origin, destination } = data;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const handleReset = () => {
		setError(null);
		setResponse(null);
		setData({
			origin: "",
			destination: "",
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setError(null);
		setResponse(null);
		setLoading(true);
		try {
			const post = await axios({
				method: "post",
				url: `https://mock-api.dev.lalamove.com/route`,
				data,
				headers: {
					token: process.env.REACT_APP_API_TOKEN,
				},
			});
			setLoading(false);

			const tokenResponse = await post?.data.token;
			if (tokenResponse) {
				setLoading(true);
				const getResponse = await axios.get(
					`https://mock-api.dev.lalamove.com/route/${tokenResponse}`
				);
				setLoading(false);
				setResponse(getResponse?.data);
			}
		} catch (error) {
			const message = error?.response?.data;
			setLoading(false);
			setError(message);
		}
	};

	return (
		<div className="flex flex-col md:flex-row w-full py-4">
			<div className="w-full md:w-1/4 bg-red-300 flex flex-col pl-4">
				<form className="flex-col w90" onSubmit={handleSubmit}>
					<div>
						<Input
							label="Starting Location"
							placeholder="Enter starting location"
							value={origin}
							name="origin"
							onChange={handleChange}
						/>
					</div>

					<div>
						<Input
							label="Drop off point"
							placeholder="Enter drop off point"
							name="destination"
							value={destination}
							onChange={handleChange}
							required
						/>
					</div>
				</form>

				<div className="mb-3">{loading ? <Spinner /> : null}</div>

				<div className="form-error">{error && error}</div>
				{response?.status && (
					<div className="text-black text-lg">Status: {response.status}</div>
				)}

				{response?.error && (
					<div className="form-error">Error: {response.error}</div>
				)}

				<div className="flex flex-row justify-evenly mt-40 mb-8">
					<Button
						loading={loading}
						text="Submit"
						type="secondary"
						onClick={handleSubmit}
					/>
					<Button text="Reset" type="primary" onClick={handleReset} />
				</div>
			</div>

			<div className="w-full md:w-9/12 bg-green-400">
				<Map />
			</div>
		</div>
	);
};

export default Home;
