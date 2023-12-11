import { useContext, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Headline from "../components/IU/Headline";
import { Context } from "../index";

const ArchThirdPage = () => {
  const { archivariusResult } = useContext(Context);
  const [pathResultShow, setPathResultShow] = useState(false);
  const { optionTitle, wordCount, createdAt } =
    archivariusResult.eventDataResult;
  const createDateA = createdAt.split("T")[0];
  const createDateB = createdAt.split("T")[1].split(".")[0];
  const date = `${createDateA} ${createDateB}`;
  const wordResult = archivariusResult.wordResult.sort(
    (a, b) => b.quantity - a.quantity
  );
  const pathResult = archivariusResult.pathResult;
  console.log("pathResult", pathResult);

  return (
    <Container>
      <Headline>Модуль Архивариус 3000 (3/3)</Headline>
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        Область поиска: {optionTitle}
      </p>
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        Количество поисковых слов: {wordCount} шт.
      </p>
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>Дата: {date}</p>
      <p>{`Примечание: если количество найденных файлов >= 1000, тогда поисковое слово прогоняем в ручную!`}</p>
      {/* <div>
            <Button style={{ marginTop: "10px" }}>Отчет полных путей до файлов</Button>
        </div>
        <div>
            <Button style={{ marginTop: "20px" }}>Отчет найденных слов</Button>
        </div>
        <div>
            <Button style={{ marginTop: "20px", marginBottom: '20px' }}>Отчет НЕ найденных слов</Button>
        </div> */}
      <Table bordered hover>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>№ п.п.</th>
            <th>Поисковое слово</th>
            <th>Количество найденных файлов</th>
          </tr>
        </thead>
        <tbody>
          {wordResult.map((item, index) => {
            return (
              <tr key={index} style={{ textAlign: "center" }}>
                <td>{index + 1}</td>
                <td>{item.word}</td>
                <td>{item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        <Button
          onClick={() => setPathResultShow(!pathResultShow)}
          style={{ marginTop: "20px", marginBottom: "30px" }}
        >
          {pathResultShow ? "Скрыть отчёт" : "Показать отчёт"}
        </Button>
      </div>
      {pathResultShow && (
        <Table bordered hover>
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>№ п.п.</th>
              <th>Полный путь</th>
              <th>Поисковое слово</th>
            </tr>
          </thead>
          <tbody>
            {pathResult.map((item, index) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{item.fullPath}</td>
                  <td style={{ textAlign: "center" }}>{item.word}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ArchThirdPage;
