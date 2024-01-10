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
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { fetchData } from "../services";

const Home: React.FC = () => {
  const handleClick = async () => {
    console.log("handling");
    const poo = await fetchData();
    console.log("poo", poo);
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
                    <IonCardTitle>Try out the Numbers API!</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <>
                      <IonSelect
                        label="Default label"
                        placeholder="Favorite Fruit"
                      >
                        <IonSelectOption value="apple">Apple</IonSelectOption>
                        <IonSelectOption value="banana">Banana</IonSelectOption>
                        <IonSelectOption value="orange">Orange</IonSelectOption>
                      </IonSelect>
                      <IonButton
                        expand="full"
                        onClick={handleClick}
                        color="light"
                      >
                        Fetch
                      </IonButton>
                    </>
                  </IonCardContent>
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
