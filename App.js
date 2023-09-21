import {
  ScrollView,
  StyleSheet,
  Platform,
  Text,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useState, useEffect } from 'react';
import {
  BannerAd,
  RewardedAd,
  InterstitialAd,
  BannerAdSize,
  TestIds,
  AdEventType,
  RewardedAdEventType
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const adUnitId1 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const adUnitId2 = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId2, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});
const interstitial = InterstitialAd.createForAdRequest(adUnitId1, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});
const App = () => {

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    interstitial.load();

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoading(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  if (!loaded || !loading) {
    return null;
  }
  return (
    <>
      <StatusBar backgroundColor="#25bddb" barStyle="light-content" />
      <View style={styles.top}>
        <Text style={styles.topText}>AdMob Implementation</Text>
      </View>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingStart: 20, marginTop: 10 }}>


        <View style={{ borderBottomWidth: 0.5, marginTop: 20 }}>
          <Text style={styles.Text}>Banner Ads</Text>
        </View>
        <View style={styles.BannerAd}>
          <Text style={{ textAlign: 'center', fontSize: 16 }}>A basic ad format that appears at the top & bottom of the device screen.
            A basic ad format that appears at the top & bottom of the device screen.
          </Text>
        </View>

        <View style={{ borderBottomWidth: 0.5, marginTop: 20 }}>
          <Text style={styles.Text}>Interstial Ads</Text>
        </View>
        <View style={styles.BannerAd}>
          <Text style={{ textAlign: 'center', fontSize: 16 }}>Full-page ads appear at natural breaks & transitions,
            such as level completion. Supports video content.

          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            interstitial.show();
          }}
          style={styles.interstial} >
          <Text style={{ color: '#fff', fontSize: 19 }}>Show Interstial Ads</Text>
        </TouchableOpacity>
        <View style={{ borderBottomWidth: 0.5, marginTop: 20 }}>
          <Text style={styles.Text}>Rewarded Ads</Text>
        </View>
        <View style={styles.BannerAd}>
          <Text style={{ textAlign: 'center', fontSize: 16 }}> Full page Ads reward users for watching short
            videos and interacting with playable ads and surveys. Good for monetizing free-to-play users.
            Supports video content.

          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            rewarded.show()
          }}
          style={styles.interstial} >
          <Text style={{ color: '#fff', fontSize: 19 }}>Show Rewarded Ads</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  BannerAd: {
    borderWidth: 0.4,
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 15,
    borderRadius: 10
  },
  topText: {
    color: '#fff',
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    fontSize: 18
  },
  top: {
    height: Platform.OS === 'ios' ? 80 : 50,
    backgroundColor: "#25bddb",
    alignItems: "center",

    justifyContent: 'center'
  },
  Text: {
    color: 'black',

    fontSize: 30,
    marginBottom: 2,
    fontWeight: '600'
  },
  interstial: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    backgroundColor: '#25db3e',

    marginRight: 40,
    borderRadius: 30,
    marginTop: 30,
    marginHorizontal: 20
  },

})