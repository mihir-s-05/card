import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { BlurView } from 'expo-blur';
const { width } = Dimensions.get('window');

const images = [
  require('./assets/image1.jpg'),
  require('./assets/image2.jpg'),
  require('./assets/image3.jpg'),
  require('./assets/image4.jpg')
];

const captions = [
  "Thank you for always cooking the best food for us! I can't wait to come back and have it again! I hopy uo enjoyed the olive oil tasting from Ojai!",
  "I hope you enoyed the detour we had on the way to Ojai! Thank you for helping me learn how to take photos as good as this one!",
  "Congratulations on how you did in the fashion show! It's really cool to see how quickly you've advanced in such a short time! When I told my friends about it a couple weeks ago they were also really impressed!",
  "Thank you for being the best mom ever! Thank you for making me who I am today even in college even when you're not here! Now more than ever I see how lucky I am to have a mom like you!"
]

const gradients = [
  { colors: ['#4D79C2', '#52412F', '#D0293B', '#C6B597', '#21262C'], locations: [0, 0.55, 0.65, 0.8, 0.95] },
  { colors: ['#7AADF2', '#9FB17F', '#4B5032', '#980013', '#C3A483'], locations: [0, 0.55, 0.65,0.8,0.95] },
  { colors: ['#E1D6C5', '#9E4417', '#009FBB', '#B27668', '#A13230'], locations: [0, 0.55, 0.65, 0.8,0.95] },
  { colors: ['#7F6D5F', '#E59E47', '#ACB7E7', '#A41556', '#F8CD9A'], locations: [0, 0.15, 0.45, 0.8, 0.95] },
  //{ colors: ['#C18DA4', '#FF5D22', '#002A6A', '#8D0039', '#CFD5DC'], locations: [0, 0.15, 0.45, 0.8, 0.95] },
  //{ colors: ['#C5A000', '#587265', '#007D89', '#947B67', '#363229'], locations: [0, 0.35, 0.55, 0.7, 0.85] }
];

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [currentGradient, setCurrentGradient] = useState(gradients[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'PlayfairDisplay': require('./assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
        'BriemHand':require('./assets/fonts/BriemHand-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>;
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={currentGradient.colors}
        locations={currentGradient.locations}
        style={styles.fullScreenGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>Happy Mother's Day!</Text>
        </View>
        <Swiper
          buttonWrapperStyle={{
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            alignItems: 'center',
            paddingHorizontal: 10,
            width: '100%',
            height: ((width+40) * 0.8) * (4 / 3), // Adjust the height to match your image's height
          }}
          showsButtons={true}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          paginationStyle={styles.pagination}
          loop={false}
          onIndexChanged={(index) => setCurrentGradient(gradients[index])}
        >
          {images.map((imageSource, index) => (
            <View key={index} style={styles.slide}>
              <TouchableOpacity onPress={() => {
                setSelectedImage(images[index]);
                setModalVisible(true);
              }}>
                <Image
                  source={imageSource}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <Text style={styles.caption}>
                {captions[index]}
              </Text>
            </View>
          ))}
        </Swiper>
      </LinearGradient>

      {/* Modal Component to display the clicked image with adjusted styles */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <BlurView
          style={styles.absolute}
          intensity={50} // You can adjust the intensity of the blur
          tint="light" // You can change this to 'dark' for a different effect
        />
        <View style={styles.centeredView}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Image source={selectedImage} style={styles.fullscreenImage} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fullScreenGradient: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  titleBar: {
    paddingVertical: 70,
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay', // Set the custom font here
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: width-50, // Full width of the screen
    height: (width-50) * (4 / 3), // Maintain a 4:3 aspect ratio
    borderRadius: 20, // Curved corners
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  image: {
    width: width * 0.8,
    height: (width * 0.8) * (4 / 3),
    borderRadius: 10,
    marginTop: 0,
  },
  caption: {
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 10,
    fontFamily:'BriemHand',
    fontWeight:'bold',
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.6)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  pagination: {
    bottom: 20
  }
});

export default App;
