import { useContext, useState } from "react";
import { Button, Container, ListGroup, Table } from "react-bootstrap";
import Headline from "../components/IU/Headline";
import { Context } from "../index";
import { useHttpArchivariusReport } from "../http/archivariusAPI";
import Loader from "../components/IU/Loader";

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
  const { request, loading } = useHttpArchivariusReport();

  const [resultDownload, setResultDownload] = useState([]);

  const reportPathsHandler = async () => {
    request("/archivarius/report-paths").then((data) => {
      setResultDownload(data);
    });
  };
  const reportWordsSuccessRecordHandler = async () => {
    request("/archivarius/report-words-success-record").then((data) => {
      setResultDownload(data);
    });
  };
  const reportWordsFailRecordHandler = async () => {
    request("/archivarius/report-words-fail-record").then((data) => {
      setResultDownload(data);
    });
  };
  const reportDescriptionHandler = async () => {
    request("/archivarius/report-description").then((data) => {
      setResultDownload(data);
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Headline>Модуль Архивариус 3000 (3/3)</Headline>
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        Область поиска: {optionTitle}
      </p>
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        Количество ключевых слов: {wordCount} шт.
      </p>
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>Дата: {date}</p>
      <p
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >{`Примечание: если количество найденных файлов >= 1000, тогда поисковое слово прогоняем в ручную!`}</p>
      <p>{`Примечание: во вкладке "Отчет", можно увидеть последний результат.`}</p>

      <h3 style={{ marginTop: "55px" }}>Сохранить отчеты из БД в файлы txt:</h3>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <Button onClick={reportPathsHandler}>Полные пути до файлов</Button>
        <Button onClick={reportWordsSuccessRecordHandler}>
          Обнаруженные кл.слова («ковычках»,)
        </Button>
        <Button onClick={reportWordsFailRecordHandler}>
          Не обнаруженные кл.слова («ковычках»,)
        </Button>
        <Button onClick={reportDescriptionHandler}>Область поиска</Button>
      </div>
      {resultDownload.length !== 0 ? (
        <h4 style={{ marginTop: "25px" }}>Отчет сохранен в файл:</h4>
      ) : null}
      <ListGroup>
        {resultDownload.map((item) => (
          <ListGroup.Item>{item}</ListGroup.Item>
        ))}
      </ListGroup>
      <h4 style={{ marginTop: "65px" }}>Отчет по кл.словам:</h4>
      <Table bordered hover>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>№ п.п.</th>
            <th>Ключевое слово</th>
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
          {pathResultShow ? "Скрыть отчёт" : "Показать отчёт на странице"}
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
