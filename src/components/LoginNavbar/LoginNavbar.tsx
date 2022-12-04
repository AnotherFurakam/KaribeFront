import { Image, Container } from "react-bootstrap";
import NavContainer from "./styled-component/NavContainer";

import LogoKaribe from '/src/assets/img/LogoKaribe.svg';

export interface LoginNavbarInterface { }

const LoginNavbar: React.FC<LoginNavbarInterface> = () => {
	return (
		<NavContainer>
			<Container className="d-flex align-items-center h-100">
				<div className="d-flex gap-2">
					<Image src={LogoKaribe} />
					<div className="d-flex flex-column justify-content-center">
						<h3 className="m-0 text-decoration-underline text-light">El Karible</h3>
						<p className="m-0 text-info">Picantería</p>
					</div>
				</div>
			</Container>
		</NavContainer>
	);
};

export default LoginNavbar;
