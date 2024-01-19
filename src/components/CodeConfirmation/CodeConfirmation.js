import React, {useState, Fragment} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';
import { useNavigation } from '@react-navigation/native';

const CodeConfirmation = ({value, setValue, count_cell = 6, editabled = true, widthInp, navigated = '', params}) => {
	const navigation = useNavigation()
	const CELL_COUNT = count_cell;
	const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});
	const onChangeNumber = (value) => {
		setValue(value)
		if (value.length === CELL_COUNT) {
			if (params !== undefined) {
				navigation.navigate(navigated, params)
			}else{
				navigation.navigate(navigated)
			}
		}
	};
	return (
	  <SafeAreaView style={styles.root}>
		  <CodeField
			ref={ref}
			{...props}
			value={value}
			onChangeText={onChangeNumber}
			cellCount={CELL_COUNT}
			rootStyle={styles.codeFieldRoot}
			keyboardType="number-pad"
			textContentType="oneTimeCode"
			renderCell={({index, symbol, isFocused}) => (
			  <Fragment key={index}>
				  <Text
					key={`value-${index}`}
					style={[styles.cell, isFocused && styles.focusCell]}
					onLayout={getCellOnLayoutHandler(index)}>
					  {symbol || (isFocused ? <Cursor /> : null)}
				  </Text>
				  {index === 1 || index === 3 ? (
					<View key={`separator-${index}`} style={styles.separator} />
				  ) : null}
			  </Fragment>
			)}
		  />
	  </SafeAreaView>
);
}

const styles = StyleSheet.create({
	logo: {
		width: '400%',
		maxWidth: 20,
		maxHeight: 20,
	},
	codeFieldRoot: {marginTop: 0},
	cell: {
		width: 40,
		height: 50,
		lineHeight: 48,
		fontSize: 24,
		borderWidth: 2,
		borderColor: '#00000030',
		backgroundColor: '#00000010',
		textAlign: 'center',
		borderRadius: 18,
	},
	focusCell: {
		borderColor: '#000',
	},
	separator: {
		height: 2,
		width: 10,
		backgroundColor: '#00000030',
		alignSelf: 'center',
	},
})

export default CodeConfirmation