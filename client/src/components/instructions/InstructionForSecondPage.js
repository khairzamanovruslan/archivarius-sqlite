import img6 from '../../img/6.jpg';

const InstructionForSecondPage = () => {

    return <div>
        <p style={{marginTop: "50px", fontSize: '18px'}}>
            1. Необходимо выбрать текстовый файл с поисковыми словами (пример
            будет ниже)
        </p>
        <p style={{marginTop: "20px", fontSize: '18px'}}>2. Выбрать область поиска</p>
        <p style={{marginTop: "20px", marginBottom: "50px", fontSize: '18px'}}>
            3. Нажать кнопку "Старт" и дождаться результата. Процесс
            обработки может занять несколько минут.
        </p>
        <img style={{marginBottom: "80px"}}  width="300" src={img6} alt='картинка'/>
    </div>
}

export default InstructionForSecondPage;