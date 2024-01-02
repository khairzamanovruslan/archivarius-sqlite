import { Container, ListGroup } from "react-bootstrap";
import Headline from "../components/IU/Headline";
import { Button } from "react-bootstrap";
import { useHttpArchivariusReport } from "../http/archivariusAPI";
import Loader from "../components/IU/Loader";
import { useState } from "react";

const ReportPage = () => {
  const { request, loading } = useHttpArchivariusReport();
  const [resultDownload, setResultDownload] = useState([]);

  const reportWordsDetailedHandler = async () => {
    request("/archivarius/report-words-detailed").then((data) => {
      setResultDownload(data);
    });
  };
  const reportWordsSuccessHandler = async () => {
    request("/archivarius/report-words-success").then((data) => {
      setResultDownload(data);
    });
  };
  const reportWordsSuccessRecordHandler = async () => {
    request("/archivarius/report-words-success-record").then((data) => {
      setResultDownload(data);
    });
  };
  const reportWordsFailHandler = async () => {
    request("/archivarius/report-words-fail").then((data) => {
      setResultDownload(data);
    });
  };
  const reportWordsFailRecordHandler = async () => {
    request("/archivarius/report-words-fail-record").then((data) => {
      setResultDownload(data);
    });
  };
  const reportPathsDetailedHandler = async () => {
    request("/archivarius/report-paths-detailed").then((data) => {
      setResultDownload(data);
    });
  };
  const reportPathsHandler = async () => {
    request("/archivarius/report-paths").then((data) => {
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
      <Headline>Отчет</Headline>
      <h3 style={{ marginTop: "25px" }}>
        Сохранить последний отчет из БД в файлы txt:
      </h3>

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
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <Button variant="secondary" onClick={reportPathsDetailedHandler}>
          Полные пути до файлов (подробно)
        </Button>
        <Button variant="secondary" onClick={reportWordsDetailedHandler}>
          Кл.слова (подробно)
        </Button>
        <Button variant="secondary" onClick={reportWordsSuccessHandler}>
          Обнаруженные кл.слова
        </Button>
        <Button variant="secondary" onClick={reportWordsFailHandler}>
          Не обнаруженные кл.слова
        </Button>
      </div>
      {resultDownload.length !== 0 ? (
        <h3 style={{ marginTop: "25px" }}>Отчет сохранен в файл:</h3>
      ) : null}
      <ListGroup>
        {resultDownload.map((item) => (
          <ListGroup.Item>{item}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ReportPage;
