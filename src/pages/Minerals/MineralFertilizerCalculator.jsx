import Capsule from "../../components/UI/Capsule/Capsule";
import Select from "../../components/UI/Select/Select";
const MineralFertilizerCalculator = () => {
  const NUTRIENTS = [
    {
      key: "nitrogen",
      label: "Азот",
      options: [
        { value: "none", label: "Нет" },
        { value: "ammiachnaya-selitra", label: "Аммиачная селитра" },
        { value: "sulfonitrat-30-7", label: "Сульфонитрат (30:7)" },
        { value: "sulfonitrat-26-13", label: "Сульфонитрат (26:13)" },
        { value: "kas-28", label: "КАС(28)" },
        { value: "karbamid", label: "Карбамид" },
        { value: "sulfat-ammoniya", label: "Сульфат аммония" },
        { value: "bezvodnyy-ammiak", label: "Безводный аммиак" },
      ],
    },
    {
      key: "phosphorus",
      label: "Фосфор",
      options: [
        { value: "none", label: "Нет" },
        { value: "ammofos-52", label: "Аммофос(52)" },
        { value: "ammofos-46", label: "Аммофос(46)" },
        { value: "diammofozka", label: "Диаммофоска" },
        { value: "azofoska-15", label: "Азофоска(15)" },
        { value: "azofoska-16", label: "Азофоска(16)" },
        { value: "npks-4", label: "NPKS(4)" },
        { value: "npks-8", label: "NPKS(8)" },
        { value: "fosmuka", label: "Фосмука" },
      ],
    },
    {
      key: "potassium",
      label: "Калий",
      options: [
        { value: "none", label: "Нет" },
        { value: "kaliy-hloristyy", label: "Калий хлористый" },
        { value: "kaliy-sernokislyy", label: "Калий сернокислый" },
      ],
    },
  ];

  return (
    <section className="container">
      <Capsule tag="div">
        <table className="calculator-params__table fertilizer">
          <thead>
            <tr>
              <th colSpan="4">Элементы питания</th>
            </tr>
            <tr>
              <th>Элемент</th>
              <th>В почве, мг/кг</th>
              <th>Удобрение</th>
              <th>Стоимость</th>
            </tr>
          </thead>
          <tbody>
            {NUTRIENTS.map((element) => {
              return (
                <tr key={element.key}>
                  <td>{element.label}</td>
                  <td>
                    <Capsule.Input
                      type={"number"}
                      id={`${element.key}Value`}
                    />
                  </td>
                  <td>
                    <Select
                      mainLabel={element.label}
                      mainId={"Выберите удобрение"}
                      optionsList={element.options}
                    />
                  </td>
                  <td>
                    <Capsule.Input
                      type={"number"}
                      id={`${element.key}Price`}
                    />
                  </td>
                </tr>
              );
            })}
            {/* <tr>
              <td>
                <p>Азот</p>
              </td>
              <td>
                <input
                  id="nitrogen-value"
                  type="number"
                  value="123"
                  min="0"
                />
              </td>
              <td>
                <select id="nitrogen">
                  <option>Нет</option>
                  <option selected>Аммиачная селитра</option>
                  <option>Сульфонитрат (30:7)</option>
                  <option>Сульфонитрат (26:13)</option>
                  <option>КАС(28)</option>
                  <option>Карбамид</option>
                  <option>Сульфат аммония</option>
                  <option>Безводный аммиак</option>
                </select>
              </td>
              <td class="fertilizer__price">
                <input
                  id="nitrogen-price"
                  type="number"
                  min="0"
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>Фосфор</p>
              </td>
              <td>
                <input
                  id="phosphorus-value"
                  type="number"
                  value="123"
                  min="0"
                />
              </td>
              <td>
                <select id="phosphorus">
                  <option>Нет</option>
                  <option selected>Аммофос(52)</option>
                  <option>Аммофос(46)</option>
                  <option>Диаммофоска</option>
                  <option>Азофоска(15)</option>
                  <option>Азофоска(16)</option>
                  <option>NPKS(4)</option>
                  <option>NPKS(8)</option>
                  <option>Фосмука</option>
                </select>
              </td>
              <td class="fertilizer__price">
                <input
                  id="phosphorus-price"
                  type="number"
                  min="0"
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>Калий</p>
              </td>
              <td>
                <input
                  id="potassium-value"
                  type="number"
                  value="123"
                  min="0"
                />
              </td>
              <td>
                <select id="potassium">
                  <option>Нет</option>
                  <option selected>Калий хлористый</option>
                  <option>Калий сернокислый</option>
                </select>
              </td>
              <td class="fertilizer__price">
                <input
                  id="potassium-price"
                  type="number"
                  min="0"
                />
              </td>
            </tr> */}
          </tbody>
        </table>
      </Capsule>
    </section>
  );
};

export default MineralFertilizerCalculator;
