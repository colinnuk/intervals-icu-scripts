import {icu} from './Types';

{
  let vam = icu.streams['VAMnonnegative'];
  
  const durations = [
    5*60, 10*60, 30*60, 60*60
  ];
  
  const bestVAMs = [];
  const durationLabels = [];
  
  durations.forEach(duration => {
    let bestAvg = 0;
    const windowSize = duration;
    
    for (let i = 0; i <= vam.length - windowSize; i++) {
      const sum = vam.slice(i, i + windowSize).reduce((a, b) => a + b, 0);
      const avg = sum / windowSize;
      if (avg > bestAvg) {
        bestAvg = avg;
      }
    }
    
    if (bestAvg > 0) {
      bestVAMs.push(bestAvg);
      
      // Format duration for display (e.g., "5s", "2m", "1h")
      let label;
      if (duration < 60) {
        label = `${duration}s`;
      } else if (duration < 3600) {
        label = `${Math.floor(duration/60)}m`;
      } else {
        label = `${Math.floor(duration/3600)}h${Math.floor((duration%3600)/60)}m`;
      }
      durationLabels.push(label);
    }
  });
  
  let data = [
    {
      x: durationLabels,
      y: bestVAMs,
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        color: '#1f77b4',
        width: 2
      },
      marker: {
        size: 8,
        color: '#1f77b4'
      }
    }
  ];
  
  let layout = {
    title: {
      text: 'VAM Curve: Best Efforts by Duration'
    },
    xaxis: {
      title: 'Duration',
      tickangle: -45
    },
    yaxis: {
      title: 'VAM (m/hr)'
    },
    showlegend: false,
    hovermode: 'closest',
    margin: {
      l: 60,
      r: 20,
      t: 40,
      b: 60
    }
  };
  
  chart = { data, layout };
}