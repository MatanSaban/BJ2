const HowToPlay = () => {
    return (
        <div className="HowToPlayPage pageWrapper">
            <div className="section">
                    <h1>How To Play</h1>
                <div className="rules">
                    <h2>BlackJack Rules</h2>
                    <p>
                        Dealer Gets 2 Cards, 1 Faced Down. <br />
                        Player Gets 2 Cards, Both Faced Up. <br />
                        The Player Hits The &quot;Hit&quot; Button As Much As He Likes. <br />
                        If The Player Hits Above 21, He &quot;Busts&quot;.<br />
                        If The Player Hits Under 21, He Can Click On &quot;Stand&quot;, <br />
                        Which Mean He Passed The Turn To The Dealer. <br />
                        If The Player Has Exactly 21, The Turn Passes To The Dealer Right Away. <br />
                        When It&apos;s The Dealer&apos;s Turn, He Hits As Long As He Has More Points Than The Player. <br />
                        When That&apos;s Happening: <br />
                        <li>Over 21 - Busts
                        </li>
                        <li>Under The Player Points - Player Wins 
                        </li>
                        <li>Over The Player Points - Dealer Wins
                        </li>
                    </p>
                    <h2>Betting</h2>
                    <p>
                        This Game Has A Betting System Which Works Like This:<br />
                        First You Can See How Much Virtual Money You Got.<br />
                        Then There Is A Place To Choose How Much You Want To Bet On Of The Amount Of VMoney You Got.<br />
                        Under It You Can See A &quot;Submit Bet&quot; Button, After You Choose The Amount Of Bet, You Have To Click That Button To Submit The Bet.<br />
                        There Is Also An Option To Turn Bet Mode Off, To Do That You Only Need To Click The &quot;Bet Mode&quot; Button, When The Button Is Red, The Bet Mode Is Off.<br />
                        <h3>I Lost All My Money! What Now?</h3>
                        <p>That&apos;s Simple, Just Click The Big Red Button, You&apos;ll See It, I Promise :)</p><br />
                    </p>
                    <h2>Users And Registrations</h2>
                    <p>There Is A Login And Registration System That Works On You Local Storage.. Check It Out</p>
                </div>
            </div>
        </div>
    );
};

export default HowToPlay;
