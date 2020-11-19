import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  // const [previewVisible, setPreviewVisible] = useState(false)
  // const [capturedImage, setCapturedImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imagemUri, SetImagemUri] = useState(null);

  let camera = Camera;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  let snap = async () => {
    if (camera){
      let photo = await camera.takePictureAsync();
      alert('Foto tirada!')
      console.log(photo);

      SetImagemUri(photo.uri);
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} 
       ref={ref => {
          camera = ref;
      }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            
          </TouchableOpacity>
          
        </View>
      </Camera>
        <Image source={{uri : imagemUri}} style={{height : 300}} />
        <Button title="Tirar foto" onPress={() => snap()}/>
    </View>
    
  );
}
