let expenseChart;
let financeChart;
let trendChart;

function updateCharts() {

  const categories = {};

  /* GROUP EXPENSES */
  transactions.forEach(t => {

    if (t.amount < 0) {

      categories[t.text] =
        (categories[t.text] || 0)
        + Math.abs(t.amount);
    }
  });

  /* DESTROY OLD */
  if (expenseChart)
    expenseChart.destroy();

  if (financeChart)
    financeChart.destroy();

  if (trendChart)
    trendChart.destroy();

  /* DONUT CHART */
  expenseChart =
    new Chart(
      document.getElementById("expenseChart"),
      {

        type: "doughnut",

        data: {

          labels:
            Object.keys(categories),

          datasets: [{

            data:
              Object.values(categories),

            backgroundColor: [

              "#8b5cf6",
              "#06b6d4",
              "#22c55e",
              "#f59e0b",
              "#ef4444",
              "#ec4899",
              "#3b82f6",
              "#14b8a6"

            ],

            borderWidth: 0
          }]
        },

        options: {

          responsive: true,

          maintainAspectRatio: false,

          plugins: {

            legend: {

              labels: {
                color: "white"
              }
            }
          }
        }
      }
    );

  /* TOTALS */

  const incomeTotal =
    transactions
      .filter(t => t.amount > 0)
      .reduce((a,b)=>a+b.amount,0);

  const expenseTotal =
    transactions
      .filter(t => t.amount < 0)
      .reduce(
        (a,b)=>a+Math.abs(b.amount),
        0
      );

  /* BAR CHART */

  financeChart =
    new Chart(
      document.getElementById("financeChart"),
      {

        type: "bar",

        data: {

          labels: [
            "Income",
            "Expense"
          ],

          datasets: [{

            data: [
              incomeTotal,
              expenseTotal
            ],

            backgroundColor: [
              "#4ade80",
              "#fb7185"
            ],

            borderRadius: 18
          }]
        },

        options: {

          responsive: true,

          maintainAspectRatio: false,

          plugins: {

            legend: {
              display: false
            }
          },

          scales: {

            x: {

              ticks: {
                color: "white"
              }
            },

            y: {

              ticks: {
                color: "white"
              }
            }
          }
        }
      }
    );

  /* TREND */

  let running = 0;

  const trendData =
    transactions.map(t => {

      running += t.amount;

      return running;
    });

  trendChart =
    new Chart(
      document.getElementById("trendChart"),
      {

        type: "line",

        data: {

          labels:
            trendData.map((_,i)=>i+1),

          datasets: [{

            data: trendData,

            borderColor: "#4ade80",

            tension: 0.4,

            fill: true,

            backgroundColor:
              "rgba(74,222,128,0.1)",

            pointRadius: 0
          }]
        },

        options: {

          responsive: true,

          maintainAspectRatio: false,

          plugins: {

            legend: {
              display: false
            }
          },

          scales: {

            x: {
              display: false
            },

            y: {
              display: false
            }
          }
        }
      }
    );
}