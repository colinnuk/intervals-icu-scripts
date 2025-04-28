import {icu} from './Types';

{
  let altMvgAvg = icu.stats.calcCenteredMovingAvg(icu.streams.fixed_altitude, 30 / (activity.icu_median_time_delta || 1));
  let timestamp = icu.streams.time;

  for (let i = 1; i < data.length; i++) {
    let altDiff = altMvgAvg[i] - altMvgAvg[i-1];
    let timeDiff = (timestamp[i] - timestamp[i-1]);
    
    let vam = (altDiff / timeDiff) * 3600;
    if (vam > 0 && vam < 2000) {
      data[i] = vam;
    } else {
      data[i] = 0;
    }
  }
}