import {Image, View, StyleSheet, ImageBackground, useWindowDimensions, Text, TouchableOpacity, TextInput} from "react-native";
import images from "../images/images";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {StatusBar} from "expo-status-bar";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {ManuelMod} from "../components/ManuelMod";
import TemplateList from "../components/TemplateList";
import {Simulation} from "./Simulation";
import SwitchSelector from "react-native-switch-selector";
import {useContext, useEffect, useState} from "react";
import {MythContext} from "../../store/myth-context";
import {findArrayElementById} from "../utils";
import {Models} from "../../data/Model";


const SimulationMainScreen = ({navigation}) => {

    const [lightDetail, setlightdetail] = useState({activeChannels: 0, sunRise: "08:00", night: "24:00", activeHours: 0, maxPar: 0, maxLumen: 0});

    const ctx = useContext(MythContext);
    useEffect(() => {
        let model = findArrayElementById(Models, ctx.aquarium.modelId, "id");
        let subModel = findArrayElementById(model.SubModels, ctx.aquarium.submodelId ?? ctx.aquarium.modelId, "id");

        let tmp = {...lightDetail};
        tmp.activeChannels = subModel.Channels.length;

        setlightdetail(tmp);

    }, [])
    const MainScreen = () => {
        return <>
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 10, alignItems: "center"}}>
                    <View style={{flex: 2, marginTop: 5, alignItems: "center"}}>
                        <Text style={{color: 'white', marginLeft: 20}}>{t("lunaar")}</Text>
                    </View>
                    <View style={{flex: 3, marginRight: 20}}>
                        <SwitchSelector
                            options={options}
                            //textStyle={{backgroundColor:'#AA3D0' }}
                            buttonColor='#AA3D01'
                            initial={1}
                            onPress={val => {console.log(val)}}
                        />
                    </View>
                </View>
                <TouchableOpacity style={{flex: 2}} onPress={() => {navigation.navigate("simulationdetail")}}>
                    <Image style={{flex: 2, height: '100%', width: '100%', resizeMode: 'contain'}} source={images.simulation}/>
                </TouchableOpacity>

                <View style={{flex: 4}}>

                    <View style={styles.row}>
                        <View style={{flex: 2}}>
                            <Text style={{color: "white"}}>{t('activechannel')}</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <Text style={{color: "white"}}>{lightDetail.activeChannels}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{flex: 2}}>
                            <Text style={{color: "white"}}>{t('sunrise')}</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <Text style={{color: "white"}}>{lightDetail.sunRise}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{flex: 2}}>
                            <Text style={{color: "white"}}>{t('night')}</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <Text style={{color: "white"}}>{lightDetail.night}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{flex: 2}}>
                            <Text style={{color: "white"}}>{t('activehours')}</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <Text style={{color: "white"}}>{lightDetail.activeHours}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{flex: 2}}>
                            <Text style={{color: "white"}}>{t('maxpar')}</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <Text style={{color: "white"}}>{lightDetail.maxPar}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{flex: 2}}>
                            <Text style={{color: "white"}}>{t('maxlumen')}</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <Text style={{color: "white"}}>{lightDetail.maxLumen}</Text>
                        </View>
                    </View>
                </View>
            </View></>
    }
    const renderScene = SceneMap({
                                     auto: MainScreen,
                                     templates: () => <TemplateList mod={'auto'}/>,
                                 });

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [t] = useTranslation();
    const [routes] = React.useState([
                                        {key: 'auto', title: 'Auto'},
                                        {key: 'templates', title: t('templates')},
                                    ]);

    const options = [
        {label: t("on"), value: "1"}, {label: t("off"), value: "0"}
    ];
    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'white'}
            inactiveColor={'black'}
            style={{marginTop: 0, backgroundColor: '#5D92C4'}}
        />
    );
    return (
        <ImageBackground source={images.background} style={{flex: 1}}>
            <StatusBar hidden={true}></StatusBar>

            <TabView
                navigationState={{index, routes}}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={setIndex}
                swipeEnabled={false}
                initialLayout={{width: layout.width}}
            />

        </ImageBackground>

    );
}
export default SimulationMainScreen;

const styles = StyleSheet.create({
                                     container: {
                                         flex: 1
                                     },
                                     row: {
                                         flexDirection: "row", marginTop: 15, marginLeft: 15
                                     }
                                 })