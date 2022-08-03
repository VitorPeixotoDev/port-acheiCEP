import React, { useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Keyboard, StyleSheet } from 'react-native'

import api from './src/services/api'

const App = () => {
  const [cep, setCep] = useState('')
  const [cepUser, setCepUser] = useState(null)
  const inputRef = useRef(null)

  const clear = () => {
    setCep('')
    inputRef.current.focus()
    setCepUser(null)
  }

  const searchCEP = async () => {
    if(cep == ''){
      alert('Digite um CEP válido')
      setCep('')
      return
    }
    try {
      const response = await api.get(`${cep}/json`)
      //console.log(response.data)
      setCepUser(response.data)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }

    Keyboard.dismiss()
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o CEP desejado:</Text>
        <TextInput
          placeholder='EX: 25750000'
          style={styles.textInput}
          value={cep}
          onChangeText={value => setCep(value)}
          keyboardType='numeric'
          ref={inputRef}
        />
      </View>

      <View style={styles.buttonsArea}>
        <TouchableOpacity 
          style={styles.buttom}
          onPress={searchCEP}
        >
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttom, {backgroundColor: '#00416B'}]}
          onPress={clear}
        >
          <Text style={[styles.buttonText, {color: '#fff'}]}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && 
         <View style={styles.result}>
         <Text style={styles.itemText}>{`CEP: ${cepUser.cep}`}</Text>
         <Text style={styles.itemText}>{`Logradouro: ${cepUser.logradouro}`}</Text>
         <Text style={styles.itemText}>{`Bairro: ${cepUser.bairro}`}</Text>
         <Text style={styles.itemText}>{`Município: ${cepUser.localidade}`}</Text>
         <Text style={styles.itemText}>{`Estado: ${cepUser.uf}`}</Text>
         <Text style={styles.itemText}>{`DDD: ${cepUser.ddd}`}</Text>
       </View>
      }
     </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#00416B'
  },
  textInput: {
    width: '74%',
    backgroundColor: '#f1f2f3',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 5,
    padding: 10,
    fontSize: 18 
  },
  buttonsArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15
  },
  buttom: {
    height: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6B809',
    borderRadius: 5,
    shadowColor: '#000',
    elevation: 5
  },
  buttonText: {
    color: '#00416B',
    fontWeight: 'bold',
    fontSize: 17
  }, 
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    color: '#00416B',
    fontSize: 20
  }
})

export default App