import Bubble from '../../../../shared/UI/Bubble/Bubble';
import type { TResultCard } from '../../types/minerals.types';
import ss from './Result.module.scss';

const Result = ({ results }: { results: TResultCard[] }) => {
  return (
    <section className={`${ss.result} section`}>
      <div className="container">
        <div className={`${ss.wrapper}`}>
          {results.map((card) => {
            let resultItems: any[];
            if (card.key === 'total') {
              resultItems = [
                { key: 'pricePerField', ...card.results.pricePerField },
                { key: 'pricePerGa', ...card.results.pricePerGa },
              ];
            } else {
              resultItems = [
                {
                  key: 'physWeightPerField',
                  ...card.results.physWeightPerField,
                },
                { key: 'physWeightPerGa', ...card.results.physWeightPerGa },
                { key: 'pricePerField', ...card.results.pricePerField },
                { key: 'pricePerGa', ...card.results.pricePerGa },
              ];
            }
            return (
              <Bubble
                legend={card.label}
                key={card.key}
                className={ss.card}
              >
                {resultItems.map((result) => {
                  return (
                    <Bubble
                      legend={result.label}
                      key={result.key}
                      className={ss.answerField}
                    >
                      {result.value}
                    </Bubble>
                  );
                })}
              </Bubble>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Result;
