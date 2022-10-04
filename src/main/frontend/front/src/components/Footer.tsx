const Footer = () => {
    return(
        <div>
            <footer className="text-center text-lg-start bg-light text-muted" style={{position: "fixed", width: "100%", height: "60px", bottom: 0}}>
                <div className="text-center p-4" style={{backgroundColor: "#b3b3b3"}}>
                    © 2022 Fakulta prírodných vied UMB:
                    <a className="text-reset fw-bold" href="https://www.fpv.umb.sk/katedry/katedra-informatiky/" style={{textDecoration: "none"}}> FPV UMB, Katedra informatiky</a>
                </div>
            </footer>
        </div>
    );
}
export default Footer;