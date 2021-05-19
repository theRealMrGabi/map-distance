import { SearchIcon } from "icons";

export const Input = ({
	placeholder,
	label,
	password,
	suffix,
	className,
	errorMessage,
	...rest
}: any) => {
	return (
		<div className={`input mb-4`}>
			<div className="flex justify-between">
				{label && (
					<span className="text-left font-medium text-sm block text-blackish mb-2">
						{label}
					</span>
				)}
			</div>

			<div className="flex">
				<input
					{...rest}
					className={`px-4 py-2 border border-solid rounded overflow-hidden border-primary-400 w-full ${
						password || rest.type === "search" || "card" ? `input-border` : ""
					}`}
					placeholder={placeholder}
				/>

				{rest.type === "search" && (
					<div className="py-2 search-border">
						<SearchSuffix />
					</div>
				)}

				{errorMessage && (
					<span className="form-error block text-left">{errorMessage}</span>
				)}
			</div>
		</div>
	);
};

const SearchSuffix = ({ onClick }: any) => {
	return (
		<div
			onClick={onClick}
			className="flex justify-center items-center w-12 cursor-pointer"
		>
			{<SearchIcon />}
		</div>
	);
};
