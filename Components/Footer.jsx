import Link from "next/link";
import Image from "next/image";
import lnkdinlogo from '../public/LinkedinLogo.png'

const Footer = (props) => {
    return ( 
        <div className="footer">
            <p>{props.title}</p>
            <Link  href={props.LinkedIn}>
                <a className="lnkdinLogo">
                    <Image
                        className="lnkdin"
                        src={lnkdinlogo}
                        alt="LinkedInLogo"
                        width="25"
                        height="25px"
                    />
                </a>
            </Link>

        </div>
     );
}
 
export default Footer;