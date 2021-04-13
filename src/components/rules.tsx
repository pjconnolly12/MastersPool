import React from 'react';
import jacket from '../images/green-jacket.jpg'
import payout from '../images/payout-grid.png'

export const Rules = (): JSX.Element => {


  return (
    <div className="flex flex-col m-4 md:m-8">
      <div className="flex flex-col md:flex-row">
        <div className="">
          <strong>ENTRY FEE:</strong>
          <br />
          $20 per entry (multipe entries accepted)
          <br />
          <strong>PRIZES:</strong>
          <br />
          The pool champion will receive an exclusive green BEER jacket
          <br />
          Prize money is broken out by the number of entries the pool has. See below for the full breakdown.
        </div>
        <br />
        <div className="place-self-center md:ml-5">
          <img className="w-32" src={jacket}/>
        </div>
      </div>
      <br />
      <div>
        <img className="" src={payout}/>
      </div>
      <div className="m-4">
        <br /><br />
        <strong>REGISTRATION:</strong>
        <br />
        To register, you must fill out the online form. This online form requires the following:
        <ul className="list-disc list-inside">
          <li>Name: Your first and last name</li>
          <li>Team Name: Any name you would like to give to this individual entry. Must be unique for each entry you submit.</li>
          <li>Five Golfers: These golfers must meet the following criteria:
              <ul className=" ml-6 list-disc list-inside">
                <li>You may choose a maximum of two (2) golfers that are ranked in the top 10 of the World Golf Rankings as of the week BEFORE the tournament</li>
                <li>Selected golfers must be on the official Masters Invitee list</li>
              </ul>
          </li>
          <li>Payment method: How you will pay your entry fee (Cash, Paypal, Venmo, etc)</li>
          <li>Entries must be submitted and paid for by 10pm on the Wednesday before the tournament. Entries submitted, but not paid for by the deadline will not be accepted into the pool. After you submit, you may change your lineup at any time prior to the submission deadline by sending an email to Pat (pmontgo33@gmail.com) or Andrew (andygould9@gmail.com). Any lineup changes received after the submission deadline will not be accepted.</li>
        </ul>
        <br />
        <strong>SCORING:</strong>
        <br />
        Your team score will be the summation of your best four (4) golfers’ scores plus any bonuses achieved by your team. See the Bonus section below for details. This means that your golfer with your worst (highest) score in the tournament is dropped.
        <br />
        If one or more of your players should miss the cut, the first two rounds will be averaged and the average score will be used for the final 2 rounds.
        <br />
        Bonuses:
        <br />
        The following bonuses can be achieved by any golfer on your team. All five (5) golfers on your team are able to achieve bonuses calculated toward your final score, including your worst golfer whose score is dropped.
        <ul className="list-disc list-inside">
          <li>Hole-in-one or Double Eagle: -5 strokes</li>
          <li>Low Round of the Day: -2 strokes</li>
          <li>Masters Champion: -2 strokes</li>
        </ul>
        <br />
        Ties:
        <br />
        Tie Breakers: There are two tiebreakers in place.  In the event of a tie...
        <ul className="list-disc list-inside">
          <li><strong>1st Tiebreak:</strong> Lowest raw team score (no bonuses included)</li>
          <li><strong>2nd Tiebreak:</strong> Lowest raw score for your 5th golfer (that is dropped)</li>
          <li>In the event there is still a tie... <strong>3rd Tiebreak:</strong> Enter your prediction for the winning score (+/- from par) of the Masters Tournament. </li>
          <li>If there is still a tie after all three tiebreakers are applied, the prizes will be combined and split.</li>
        </ul>
        <br />
        Withdraws:
        <br />
        <ul className="list-disc list-inside">
          <li>In the event a golfer withdraws (WD) from the Masters Tournament, they will be recorded the lowest possible score in the pool. </li>
          <li>If two teams tie and it goes to a tie break any finished score (even if player misses the cut) will beat a WD score.  If each player on the tied teams have a WD then that is recorded as a tie and move to the next tiebreaker.</li>
          <li>In the event a single team has 2 WD golfers, that team will automatically be last place.</li>
        </ul>
      </div>
    </div>
  );
}