import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Text, Button } from 'react-native-elements';

import { lang as HomeLang } from '../../language/home';
import * as FileSystem from 'expo-file-system';
import * as dataImport from '../../utils/share'

import styles from './styles';

export default function ImportData(props) {
    const [step, setStep] = useState(1);
    const [error, setError] = useState();
    
    useEffect( async () => {
        try {

            // Import and check file data
            const content = await FileSystem.readAsStringAsync(props.importFile).catch(e => {
                console.log(e);
                throw HomeLang[props.lang].InvalidFile;
            });
            const parsed = parseJSON(content);
            if (!parsed) throw HomeLang[props.lang].InvalidPersonFile;
            if (typeof parsed !== 'object' || !parsed._id)
                throw HomeLang[props.lang].InvalidPersonFile;

            // Checking the personal infos
            setStep(2);
            if (dataImport.checkPersonInformations(parsed) === false)
                throw HomeLang[props.lang].InvalidPersonFile;
            if (dataImport.checkPersonInformationsLength(parsed) === false)
                throw HomeLang[props.lang].IncorrectPersonFile;

            // Checking if this userId is registered in the local db
            setStep(3);
            const found = await dataImport.checkPersonExists(parsed._id);
            
            // Checking activities length
            setStep(4);
            if (parsed.activities.length > 4) throw HomeLang[props.lang].InvalidActivitiesLength;

            // Checking quiz format
            setStep(5);
            if (await dataImport.checkQuiz(parsed.activities.quiz, parsed._id) === false) throw HomeLang[props.lang].InvalidQuizData;

            // Checking double format
            setStep(6);
            if (await dataImport.checkDouble(parsed.activities.double, parsed._id) === false) throw HomeLang[props.lang].InvalidDoubleData;

            // Checking simon format
            setStep(7);
            if (await dataImport.checkSimon(parsed.activities.simon, parsed._id) === false) throw HomeLang[props.lang].InvalidSimonData;
      
            // Checking dictaphone format
            setStep(8);
            if (await dataImport.checkDictaphone(parsed.activities.dictaphone, parsed._id) === false) throw HomeLang[props.lang].InvalidLogData;

            // <! -------- Creation process starts ---------- !>

            // Person creation
            setStep(9);
            dataImport.importPerson(parsed, found.length > 0).catch( (err) => {
                throw HomeLang[props.lang].CannotCreatePerson;
            });

            // Quiz creation
            setStep(10);
            dataImport.importQuiz(parsed.activities.quiz).catch(err => {
                throw HomeLang[props.lang].InvalidQuizData;
            });

            // Double creation
            setStep(11);
            dataImport.importDouble(parsed.activities.double).catch(err => {
                throw HomeLang[props.lang].InvalidDoubleData;
            });

            // Simon creation
            setStep(12);
            dataImport.importSimon(parsed.activities.simon).catch(err => {
                throw HomeLang[props.lang].InvalidSimonData;
            });

            // Journal log creation
            setStep(13);
            dataImport.importLog(parsed.activities.dictaphone, parsed._id).catch(err => {
                throw HomeLang[props.lang].InvalidLogData;
            });

            // SUCCESS !!
            setStep(14);

            await FileSystem.deleteAsync(props.importFile).catch(e => {
                throw HomeLang[props.lang].InvalidPersonFile;
            });


        } catch (e) {
            setError(e);
            return false;
            // props.setImportFile(null);
        }
    }, [])

    const parseJSON = (inputString) => {
        if (inputString) {
          try {
            return JSON.parse(inputString);
          } catch (e) {
            return false;
          }
        }
    };

    const stepStyle = (idx) => {
        let clr = idx === step ? 'white' : '#89ff91';
        if (error && idx === step) clr = 'red';
        if (step === 14) clr = '#89ff91';
        return {
            color: clr,
            fontStyle: idx === step || error ? 'italic' : 'normal',
            marginBottom: idx === 13 ? 30 : 0,
            display: step >= idx ? 'flex' : 'none',
            alignContent: 'center',
            textAlign: 'center',
            fontSize: idx === step ? wp('4%') : wp('2%')
        }
    } 

    const printActivity = (idx) => {
        if (idx === step && !error && step !== 14)
            return <ActivityIndicator color={'white'} size={'small'} />
        return <></>
    };

    return (
        <ScrollView style={styles.menu}>
            { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map( (e, i) => {
                return <Text key={i} style={ stepStyle(e) }> { HomeLang[props.lang]['Step' + e] } { printActivity(e) }</Text>
            }) }
            { error ? <Text style={styles.ErrorMessage}>{ error }</Text> :  <></> }
            <Button disabled={!error && step < 14}
                containerStyle={{marginTop: hp('3%'), borderRadius: 15}}
                buttonStyle={styles.backButton}
                titleStyle={styles.backButtonTitle}
                title={HomeLang[props.lang].GoBack}
                onPress={() => props.setImportFile(null)}
            />
        </ScrollView>
    );
}
