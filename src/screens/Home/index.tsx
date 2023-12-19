import { useState } from 'react'

import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'

import 'react-native-get-random-values'

import { v4 as uuidv4 } from 'uuid'

import { styles } from './styles'

import { Participant } from '../../components/Participant'

export function Home () {
    const [participants, setParticipants] = useState <string[]> ([])

    const [participantName, setParticipantName] = useState ('')

    function handleParticipantAdd () {
        if (participants.includes (participantName)) {
            return Alert.alert ('Participante existe!', 'Já existe um participante na lista com esse nome!')
        }

        if (participantName === '') {
            return Alert.alert ('Nome inválido', 'Digite um nome para adicionar na lista!')
        }

        setParticipants (prevState => [...prevState, participantName])

        setParticipantName ('')
    }

    function handleParticipantRemove (name: string) {
        Alert.alert ('Remover', `Deseja remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => {
                    setParticipants (prevState => prevState.filter (participant => participant !== name))
                    Alert.alert (`Participante ${name} deletado!`)
                }
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    return (
        <View style = {styles.container}>
            <TextInput 
                style = {styles.eventName}
                placeholder = 'Nome do Evento'
                placeholderTextColor = '#6B6B6B'
            />

            <TextInput 
                style = {styles.eventDate}
                placeholder = 'Dia, Dia/Mês/Ano'
                placeholderTextColor = '#6B6B6B'
            />

            <View style = {styles.form}>
                <TextInput 
                    style = {styles.input}
                    placeholder = 'Nome do Participante'
                    placeholderTextColor = '#6B6B6B'
                    onChangeText = {e => setParticipantName (e)}
                    value = {participantName}
                />

                <TouchableOpacity style = {styles.button} onPress = {handleParticipantAdd}>
                    <Text style = {styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data = {participants}
                keyExtractor = {item => uuidv4()}
                renderItem = {({ item }) => (
                    <Participant
                        name = {item}
                        onRemove = {() => handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator = {false}
                ListEmptyComponent = {() => (
                    <Text style = {styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione árticipantes a sua lista de presença!
                    </Text>
                )}
            />
        </View>
    )
}