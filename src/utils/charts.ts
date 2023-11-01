import { Chart, type ChartConfiguration, type ChartDataset } from 'chart.js/auto';

export function charts() {
  // Pie chart
  const ctx = document.querySelector<HTMLCanvasElement>('[data-element="pie-chart"]');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Line chart
  const ctx2 = document.querySelector<HTMLCanvasElement>('[data-element="line-chart"]');
  if (!ctx2) return;

  const chartDataset: ChartDataset<'line', number[]> = {
    label: 'First Dataset',
    data: [10, 20, 30],
    borderColor: 'red',
    borderWidth: 1,
  };

  const chartConfiguration: ChartConfiguration<'line', number[], string> = {
    type: 'line',
    data: {
      datasets: [chartDataset],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const chart = new Chart(ctx2, chartConfiguration);
  chart.render();
}
