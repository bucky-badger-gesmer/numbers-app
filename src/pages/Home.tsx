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
import { getTriviaFact } from "../services";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [numericValue, setNumericValue] = useState<number>(0);
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

    validateNumericInput(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  const handleClick = async () => {
    setLoading(true);
    const fact = await getTriviaFact(numericValue);
    setFact(fact);
    setLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Numbers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Numbers</IonTitle>
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
                    <IonCardTitle>Try out the Numbers API</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <>
                      <IonLabel>Choose Type</IonLabel>
                      <IonSelect defaultValue="apple">
                        <IonSelectOption value="apple">Trivia</IonSelectOption>
                        <IonSelectOption value="banana">Math</IonSelectOption>
                        <IonSelectOption value="orange">Date</IonSelectOption>
                        <IonSelectOption value="orange">Year</IonSelectOption>
                      </IonSelect>
                      <IonInput
                        className={`${isValid && "ion-valid"} ${
                          isValid === false && "ion-invalid"
                        } ${isTouched && "ion-touched"}`}
                        type="email"
                        fill="solid"
                        label="Number"
                        labelPlacement="floating"
                        helperText="Enter a valid numeric value"
                        errorText="Invalid numeric value. '000' is not a valid value."
                        onIonInput={(event) => validate(event)}
                        onIonBlur={() => markTouched()}
                      ></IonInput>
                      <IonButton
                        expand="full"
                        onClick={handleClick}
                        color="light"
                        disabled={!isValid}
                      >
                        Fetch
                      </IonButton>
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
                    <>{fact}</>
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
