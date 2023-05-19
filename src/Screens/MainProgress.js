import {ImageBackground, View, StyleSheet} from "react-native";
import ChannelProgress from "../components/ChannelProgress";
import images from "../images/images";

const MainProgress = (props) => {

    return (
        <ImageBackground source={images.background} style={{flex: 1}}>
            <View style={{flex: 1, padding: 5}}>

                <View style={{flex: 1}}></View>
                <View style={styles.progressContainer}>
                    <View>
                        <ChannelProgress ChannelName='Royal'></ChannelProgress>
                    </View>
                    <View>
                        <ChannelProgress ChannelName='Blue'></ChannelProgress>
                    </View>
                    <View>
                        <ChannelProgress ChannelName='Cyan+'></ChannelProgress>
                    </View>
                    <View>
                        <ChannelProgress ChannelName='Actinic+'></ChannelProgress>
                    </View>
                    <View>
                        <ChannelProgress ChannelName='He White'></ChannelProgress>
                    </View>
                    <View>
                        <ChannelProgress ChannelName='Magenta+'></ChannelProgress>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
        ;
}

export default MainProgress;
const styles = StyleSheet.create({
    progressContainer: {
        flex:2,
        display: "flex",
        justifyContent:"flex-end",
    },
});