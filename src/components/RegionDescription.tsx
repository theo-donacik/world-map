import { Region } from "../util/types";

export default function RegionDescription({region, interested, handleInterest}: {region: Region, interested: boolean, handleInterest: () => void}) {
  return (
    <div className='region-drawer'>
      <text style={{fontSize: '20px'}}>A level {region.level} adventure</text>

      <text style={{fontSize: '20px'}}>Reward: {region.reward}</text>

      <text style={{fontSize: '20px', marginTop: '20px', marginBottom: '20px'}}>{region.description}</text>

      <button
        className={'btn btn-primary interest-btn ' + (interested ? "success" : "")}
        onClick={handleInterest}
      >
        {interested ?  "Interest noted" : "I'm Interested"  }
      </button>
    </div>
  )
}