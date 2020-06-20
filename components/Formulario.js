import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, guardarMostrarform}) => {
  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarPropietario] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [hora, guardarHora] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [sintomas, guardarSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    guardarFecha(date.toLocaleDateString('es-Es', opciones));
    hideDatePicker();
  };

  //Muestra u oculta el Time Picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = (hora) => {
    guardarHora(
      hora.toLocaleString('es-ES', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    );
    hideTimePicker();
  };

  //Crear Nueva Cita
  crearNuevaCita = () => {
    //Validar
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim === ''
    ) {
      //Falla la validacion
      mostrarAlerta();
      return;
    } else {
      confirmarAlerta();
    }

    //Crear una Nueva Cita
    const cita = {paciente, propietario, telefono, fecha, hora, sintomas};
    cita.id = shortid.generate();

    //Agregar citas al state
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);

    //Ocultar el formulario
    guardarMostrarform(false);

    //Resetear el Formulario
  };

  //Muestra un alerta si falla la validacion
  mostrarAlerta = () => {
    Alert.alert(
      'Error', //Titulo
      'Todos los campos son obligatorios', // cuerpo del mensaje
      [
        {
          text: 'OK', //Arreglo de Botonoes
        },
      ],
    );
  };

  confirmarAlerta = () => {
    Alert.alert('Procesado ', 'Cita Creada Exitosamente ', [
      {
        text: 'OK',
      },
    ]);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.formulario}>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => guardarPaciente(texto)}
          />
        </View>

        <View style={styles.formulario}>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => guardarPropietario(texto)}
          />
        </View>

        <View style={styles.formulario}>
          <Text style={styles.label}>Teléfono Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => guardarTelefono(texto)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formulario}>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
          />
          <Text>{fecha}</Text>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
          />
          <Text>{hora}</Text>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(texto) => guardarSintomas(texto)}
          />
          <TouchableHighlight
            onPress={() => crearNuevaCita()}
            style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>Crear Nueva Cita </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginTop: 10,
    marginBottom: 10,
  },
  textoSubmit: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
