import type { TResultCard, TResultItem } from '../../types/minerals.types';
import ss from './Result.module.scss';

function getResultItem(card: TResultCard): TResultItem[] {
  if (card.key === 'total') {
    return [
      { key: 'pricePerField', ...card.results.pricePerField },
      { key: 'pricePerGa', ...card.results.pricePerGa },
    ];
  }
  return [
    {
      key: 'physWeightPerField',
      ...card.results.physWeightPerField,
    },
    { key: 'physWeightPerGa', ...card.results.physWeightPerGa },
    { key: 'pricePerField', ...card.results.pricePerField },
    { key: 'pricePerGa', ...card.results.pricePerGa },
  ];
}
const Result = ({ results }: { results: TResultCard[] }) => {
  return (
    <section className={`${ss.result} section`}>
      <div className="container">
        <div className={ss.header}>
          <span className={ss.eyebrow}>Результаты расчёта</span>
          <h2 className={ss.title}>Сводка по внесению удобрений</h2>
          <p className={ss.description}>
            По каждому элементу видно физический вес и стоимость, а итоговая карточка собирает
            суммарный бюджет по всему полю.
          </p>
        </div>

        <div className={ss.wrapper}>
          {results.map((card) => {
            const resultItems: TResultItem[] = getResultItem(card);

            return (
              <article
                key={card.key}
                className={`${ss.card} ${card.key === 'total' ? ss.totalCard : ''}`}
              >
                <div className={ss.cardHeader}>
                  <span className={ss.cardEyebrow}>
                    {card.key === 'total' ? 'Суммарная стоимость' : 'Элемент питания'}
                  </span>
                  <h3 className={ss.cardTitle}>{card.label}</h3>
                </div>

                <div className={`${ss.metrics} ${card.key === 'total' ? ss.totalMetrics : ''}`}>
                  {resultItems.map((result) => {
                    return (
                      <div
                        key={result.key}
                        className={ss.metric}
                      >
                        <span className={ss.metricLabel}>{result.label}</span>
                        <strong className={ss.metricValue}>{result.value}</strong>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Result;
