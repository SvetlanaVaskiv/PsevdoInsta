
import { useHistory } from "react-router-dom";

export const Root = () => {
	const history = useHistory()
	const onGoForward = () => history.push({
		pathname: `/login`,
	});
	return (
		<StyleCard >
			<img
				src={`https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg`}
				width='620'
			/>
			<ButtonStyle variant='contained' onClick={onGoForward}>Watch Movie</ButtonStyle>
		</StyleCard>
	)
}