import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { getFact, getTriviaFact } from "../services";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<
    "trivia" | "math" | "date" | "year"
  >("trivia");
  const [loading, setLoading] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [numericValue, setNumericValue] = useState<number>(0);
  const [yearValue, setYearValue] = useState<number>(2024);
  const [fact, setFact] = useState<string>("");

  useEffect(() => {
    const setup = async () => {
      const randomNumber = getRandomNumber();
      const triviaFact = await getTriviaFact(randomNumber);
      setFact(triviaFact);
      setNumericValue(randomNumber);
      setLoading(false);
    };

    setup();
  }, []);

  const getRandomNumber = (): number => {
    return Math.floor(Math.random() * 99) + 1;
  };

  const validateNumericInput = (input: string) => {
    const isValid = input.match(/^-?(0|[1-9]\d*)$/);
    if (isValid) {
      setNumericValue(+input);
    }
    return isValid;
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === "") return;

    if (selectedValue === "year") {
      validateNumber(value);
    } else {
      validateNumericInput(value) !== null
        ? setIsValid(true)
        : setIsValid(false);
    }
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  const validateNumber = (input: string): boolean => {
    const regex = /^-?(3000|[12]?[0-9]{1,3})$/;
    const isValid = regex.test(input);
    setNumericValue(+input);
    if (isValid) {
      setIsValid(true);
    }
    return isValid;
  };

  const handleClick = async () => {
    setLoading(true);
    switch (selectedValue) {
      case "trivia":
        const triviaFact = await getFact(numericValue, selectedValue);
        setFact(triviaFact);
        setLoading(false);
        break;
      case "math":
        const mathFact = await getFact(numericValue, selectedValue);
        setFact(mathFact);
        setLoading(false);
      case "year":
        const yearFact = await getFact(numericValue, selectedValue);
        setFact(yearFact);
        setLoading(false);
    }
  };

  const handleRandomMathClick = async () => {
    setLoading(true);
    const randomNumber = Math.floor(Math.random() * 201) - 100;
    const triviaFact = await getFact(randomNumber, "math");
    setFact(triviaFact);
    setLoading(false);
  };

  const handleRandomTriviaClick = async () => {
    setLoading(true);
    const randomNumber = Math.floor(Math.random() * 201) - 100;
    const triviaFact = await getFact(randomNumber, "trivia");
    setFact(triviaFact);
    setLoading(false);
  };

  const handleYearSelect = (year: string) => {
    setYearValue(+year);
    setIsValid(true);
  };

  const renderResult = () => {
    switch (selectedValue) {
      case "trivia":
        return (
          <IonInput
            className={`${isValid && "ion-valid"} ${
              isValid === false && "ion-invalid"
            } ${isTouched && "ion-touched"}`}
            type="email"
            fill="solid"
            label="Number"
            labelPlacement="floating"
            helperText="Enter a valid numeric value"
            errorText="Invalid numeric value. Repeating 0's is not a valid value."
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
          ></IonInput>
        );
      case "math":
        return (
          <IonInput
            className={`${isValid && "ion-valid"} ${
              isValid === false && "ion-invalid"
            } ${isTouched && "ion-touched"}`}
            type="number"
            fill="solid"
            label="Number"
            labelPlacement="floating"
            helperText="Enter a valid numeric value"
            errorText="Invalid numeric value. Repeating 0's is not a valid value."
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
          ></IonInput>
        );
      case "year":
        const years = [];
        for (let i = 2024; i >= 0; i--) {
          years.push(i);
        }

        return (
          <IonInput
            className={`${isValid && "ion-valid"} ${
              isValid === false && "ion-invalid"
            } ${isTouched && "ion-touched"}`}
            type="email"
            fill="solid"
            label="Number"
            labelPlacement="floating"
            helperText="Enter a valid numeric value"
            errorText="Invalid numeric value. Repeating 0's is not a valid value."
            onIonInput={(event) => validate(event)}
            onIonBlur={() => markTouched()}
          ></IonInput>
        );
      case "date":
        return <>DATE</>;
      default:
        return;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Numbers API App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Numbers API App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IonCard
                  style={{
                    width: "100%",
                    maxWidth: "750px",
                  }}
                >
                  <IonCardHeader>
                    <IonCardTitle>Try the Numbers API, AARON!</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <>
                      <IonLabel>Choose Type</IonLabel>
                      <IonSelect
                        value={selectedValue}
                        onIonChange={(e) => setSelectedValue(e.detail.value)}
                      >
                        <IonSelectOption value="trivia">Trivia</IonSelectOption>
                        <IonSelectOption value="math">Math</IonSelectOption>
                        <IonSelectOption value="date">Date</IonSelectOption>
                        <IonSelectOption value="year">Year</IonSelectOption>
                      </IonSelect>
                      {renderResult()}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <IonButton
                          expand="full"
                          onClick={handleClick}
                          shape="round"
                          color="primary"
                          disabled={!isValid}
                        >
                          Get Fact
                        </IonButton>
                        <IonButton
                          expand="full"
                          onClick={handleRandomTriviaClick}
                          shape="round"
                          color="secondary"
                        >
                          Random Trivia Fact
                        </IonButton>
                        <IonButton
                          expand="full"
                          onClick={handleRandomMathClick}
                          shape="round"
                          color="tertiary"
                        >
                          Random Math Fact
                        </IonButton>
                        <IonButton
                          disabled={true}
                          expand="full"
                          onClick={handleRandomMathClick}
                          shape="round"
                          color="success"
                        >
                          Random Date Fact
                        </IonButton>
                        <IonButton
                          disabled={true}
                          expand="full"
                          onClick={handleRandomMathClick}
                          shape="round"
                          color="warning"
                        >
                          Random Year Fact
                        </IonButton>
                      </div>
                    </>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IonCard
                  style={{
                    width: "100%",
                    maxWidth: "750px",
                  }}
                >
                  {loading ? (
                    <div className="loader-container">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: "24px",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h2>{fact}</h2>
                    </div>
                  )}
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
