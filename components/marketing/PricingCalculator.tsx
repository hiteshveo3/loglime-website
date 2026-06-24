"use client";

import { useMemo, useState } from "react";

const plans = [
  { name: "Starter", price: 149 },
  { name: "Business", price: 249 },
  { name: "Pro", price: 399 }
] as const;

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency"
  }).format(Math.max(0, Math.round(value)));
}

export function PricingCalculator() {
  const [orders, setOrders] = useState(120);
  const [averageOrder, setAverageOrder] = useState(28);
  const [commission, setCommission] = useState(25);
  const [planName, setPlanName] = useState<(typeof plans)[number]["name"]>("Business");

  const selectedPlan = plans.find((plan) => plan.name === planName) || plans[1];
  const result = useMemo(() => {
    const monthlyRevenue = orders * averageOrder;
    const monthlyCommission = monthlyRevenue * (commission / 100);
    const yearlyCommission = monthlyCommission * 12;
    const breakEvenOrders = monthlyCommission > 0 ? Math.ceil(selectedPlan.price / (averageOrder * (commission / 100))) : 0;
    const paybackDays = monthlyCommission > 0 ? Math.ceil((selectedPlan.price / monthlyCommission) * 30) : 0;
    const firstYearSavings = yearlyCommission - selectedPlan.price;

    return {
      breakEvenOrders,
      firstYearSavings,
      monthlyCommission,
      monthlyRevenue,
      paybackDays,
      yearlyCommission
    };
  }, [averageOrder, commission, orders, selectedPlan.price]);

  return (
    <section className="pricing-calculator" id="calculator">
      <div className="container pricing-calculator-grid">
        <div className="pricing-calculator-copy">
          <span className="pricing-eyebrow">Savings calculator</span>
          <h2>See how quickly zero commission pays back.</h2>
          <p>
            Estimate the commission a restaurant keeps when guests order directly through its own branded Loglime app
            instead of a marketplace taking a percentage from every sale.
          </p>
          <div className="pricing-calc-note">
            <strong>Assumption:</strong> payment gateway fees are paid to the gateway directly. Loglime takes 0%
            commission on every order.
          </div>
        </div>

        <div className="pricing-calc-panel">
          <div className="pricing-calc-controls">
            <label>
              <span>
                Monthly direct orders <strong>{orders}</strong>
              </span>
              <input max="1000" min="10" onChange={(event) => setOrders(Number(event.target.value))} type="range" value={orders} />
            </label>
            <label>
              <span>
                Average order value <strong>{money(averageOrder)}</strong>
              </span>
              <input
                max="120"
                min="8"
                onChange={(event) => setAverageOrder(Number(event.target.value))}
                type="range"
                value={averageOrder}
              />
            </label>
            <label>
              <span>
                Marketplace commission <strong>{commission}%</strong>
              </span>
              <input
                max="35"
                min="10"
                onChange={(event) => setCommission(Number(event.target.value))}
                type="range"
                value={commission}
              />
            </label>
          </div>

          <div className="pricing-plan-switch" aria-label="Choose Loglime plan">
            {plans.map((plan) => (
              <button
                aria-pressed={plan.name === planName}
                className={plan.name === planName ? "active" : ""}
                key={plan.name}
                onClick={() => setPlanName(plan.name)}
                type="button"
              >
                <span>{plan.name}</span>
                <strong>{money(plan.price)}</strong>
              </button>
            ))}
          </div>

          <div className="pricing-calc-results">
            <article className="pricing-result-card dark">
              <span>Estimated monthly marketplace fees</span>
              <strong>{money(result.monthlyCommission)}</strong>
              <small>On {money(result.monthlyRevenue)} monthly direct-order revenue</small>
            </article>
            <article className="pricing-result-card lime">
              <span>First-year commission kept</span>
              <strong>{money(result.firstYearSavings)}</strong>
              <small>After the {money(selectedPlan.price)} one-time Loglime setup</small>
            </article>
            <article className="pricing-result-card">
              <span>Break-even point</span>
              <strong>{result.breakEvenOrders} orders</strong>
              <small>Approx. {result.paybackDays} days at this order volume</small>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
