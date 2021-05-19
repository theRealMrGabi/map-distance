import { FC } from "react";
import { Spinner } from "components";

type Props = {
	text: string;
	type: string;
	loading?: boolean;
	rest?: any;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: FC<Props> = ({
	text,
	loading,
	className,
	type,
	onClick,
	...rest
}) => {
	return (
		<button
			onClick={onClick}
			disabled={loading}
			{...rest}
			className={`button transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0
			${type === "primary" && `primary`}
			${type === "secondary" && `secondary`} ${className}
			${loading && `opacity-100`}
			`}
		>
			{loading ? <Spinner /> : text}
		</button>
	);
};
