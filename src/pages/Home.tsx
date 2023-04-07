
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonModal, IonButton, IonButtons, IonSearchbar, IonIcon, useIonViewDidEnter } from '@ionic/react';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation';
import React, { useRef, useState } from 'react';
import { search, chatboxEllipses, planet } from 'ionicons/icons'
import './Home.css';

interface LocationError {
  showError: boolean;
  message?: string;
}

const Home: React.FC = () => {
  const [error, setError] = useState<LocationError>({ showError: false });
  const [position, setPosition] = useState<Geoposition>();

  async function getLocation() {
      try {
          const position = await Geolocation.getCurrentPosition();
          setPosition(position);
          setError({ showError: false });
      } catch (e) {
          setError({ showError: true, message: e.message });
          console.log(error)
      }
  }
  
  const modal = useRef<HTMLIonModalElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const mapRef = useRef<HTMLElement>();
  let newMap: GoogleMap;
  const currentLocation = {
    lat: parseFloat(position?.coords.latitude),
    lng: parseFloat(position?.coords.longitude),
  };

  console.log(position)

  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'cf254e5cfaaf7b35',
      element: mapRef.current,
      apiKey: 'AIzaSyAGGB_ZkNNI09fJS3g9I47dywjVtnNr9Do',
      config: {
        center: currentLocation,
        zoom: 15,
        clickableIcons: false,
        disableDefaultUI: true,
      }
    });

    await newMap.addMarker({
      coordinate: currentLocation,
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/10164/10164406.png',
      iconAnchor: {
        x: 25,
        y: 54
      },
      iconSize: {
        width: 50,
        height: 54
      },
    });
  };

  useIonViewDidEnter(() => {
    getLocation();
  });

  createMap();

  return (
    <IonPage>
    <IonHeader>
      <IonTitle class="float place">Malang</IonTitle>
    </IonHeader>
    <IonContent>
    <IonButton expand="block" onClick={() => setIsOpen(true)} class="float chat left">
      <IonIcon icon={search}/>
    </IonButton>
    <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modal</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p className="ion-padding-horizontal">You must accept the terms and conditions to close this modal.</p>
        </IonContent>
    </IonModal>
    <IonButton id="open-modal" expand="block" class="center float chat">
      <IonIcon icon={chatboxEllipses}/>
    </IonButton>
    <IonModal
      id="chat"
      ref={modal}
      trigger="open-modal"
      canDismiss={true}
      initialBreakpoint={.5}
      breakpoints={[0, .1, .2, .3, .4, .5, .6, .7, .8, .99]}
      backdropBreakpoint={0}
      handleBehavior="cycle"
    >
      <IonContent>
        <IonToolbar>
            <IonTitle>Friends</IonTitle>
            <IonSearchbar onClick={() => modal.current?.setCurrentBreakpoint(0.99)} showCancelButton="focus" placeholder="Search"></IonSearchbar>
        </IonToolbar>
        <div className="ion-margin-top">
        </div>
      </IonContent>
    </IonModal>
    <IonButton expand="block" onClick={() => setIsOpen(true)} class="float chat right">
      <IonIcon icon={planet}/>
    </IonButton>
    <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modal</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent class="geo">
  
        </IonContent>
    </IonModal>
      <capacitor-google-map ref={mapRef} style={{
        display: 'inline-block',
        width: '100%',
        height: '100%'
      }}></capacitor-google-map>
    </IonContent>
    </IonPage>
  )
}

export default Home;
function ionViewDidEnter() {
  throw new Error('Function not implemented.');
}

