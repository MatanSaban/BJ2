import Link from "next/link";


const UserArea = () => {
    return ( 
        <>
            <button>
                <Link href="/Login" >
                    Login
                </Link>
            </button>
            <button>
                <Link href="/Register" >
                    Register
                </Link>
            </button>
        </>
     );
}
 
export default UserArea;