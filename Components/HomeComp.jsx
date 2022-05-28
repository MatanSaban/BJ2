import Link from 'next/link';

const HomeComp = ( props ) => {
    return ( 
        <div className='homeWrapper wrapper'>
            <section className='welcomeSection section'>
                <h1 className="h1t">{props.title}</h1>
                <p>
                    <span>Here You Can Play BlackJack Against The Computer For Free.</span>
                    <br />
                    In Order To Start A New Game You Can Click The &quot;Play Now&quot; Button
                    <br />
                    Or Register As A New Player And Save Your Stats.
                </p>
                {
                    !props.userState.userLoggedIn ? <div className='startingButtons'> <button><Link href="/Game">New Game</Link></button><button><Link href="/Register">Register</Link></button></div> : <button><Link href="/Game">NewGame</Link></button>
                }
            </section>
        </div> 
    );
}
 
export default HomeComp;