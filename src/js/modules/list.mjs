import { translate as t } from '@nextcloud/l10n'

var format_List = {
    "en-EN": "en-EN",
    "fr-FR": "fr-FR"
}

var currency_list = {
    "EUR": t('gestion', 'Euro'),
    "USD": t('gestion', 'US Dollar'),
    "GBP": t('gestion', 'British Pound Sterling'),
    "JPY": t('gestion', 'Japanese Yen'),
    "CNY": t('gestion', 'Chinese Yuan'),
    "AFA": t('gestion', 'Afghan Afghani'),
    "ALL": t('gestion', 'Albanian Lek'),
    "DZD": t('gestion', 'Algerian Dinar'),
    "AOA": t('gestion', 'Angolan Kwanza'),
    "ARS": t('gestion', 'Argentine Peso'),
    "AMD": t('gestion', 'Armenian Dram'),
    "AWG": t('gestion', 'Aruban Florin'),
    "AUD": t('gestion', 'Australian Dollar'),
    "AZN": t('gestion', 'Azerbaijani Manat'),
    "BSD": t('gestion', 'Bahamian Dollar'),
    "BHD": t('gestion', 'Bahraini Dinar'),
    "BDT": t('gestion', 'Bangladeshi Taka'),
    "BBD": t('gestion', 'Barbadian Dollar'),
    "BYR": t('gestion', 'Belarusian Ruble'),
    "BEF": t('gestion', 'Belgian Franc'),
    "BZD": t('gestion', 'Belize Dollar'),
    "BMD": t('gestion', 'Bermudan Dollar'),
    "BTN": t('gestion', 'Bhutanese Ngultrum'),
    "BTC": t('gestion', 'Bitcoin'),
    "BOB": t('gestion', 'Bolivian Boliviano'),
    "BAM": t('gestion', 'Bosnia-Herzegovina Convertible Mark'),
    "BWP": t('gestion', 'Botswanan Pula'),
    "BRL": t('gestion', 'Brazilian Real'),
    "BND": t('gestion', 'Brunei Dollar'),
    "BGN": t('gestion', 'Bulgarian Lev'),
    "BIF": t('gestion', 'Burundian Franc'),
    "KHR": t('gestion', 'Cambodian Riel'),
    "CAD": t('gestion', 'Canadian Dollar'),
    "CVE": t('gestion', 'Cape Verdean Escudo'),
    "KYD": t('gestion', 'Cayman Islands Dollar'),
    "XOF": t('gestion', 'CFA Franc BCEAO'),
    "XAF": t('gestion', 'CFA Franc BEAC'),
    "XPF": t('gestion', 'CFP Franc'),
    "CLP": t('gestion', 'Chilean Peso'),
    "COP": t('gestion', 'Colombian Peso'),
    "KMF": t('gestion', 'Comorian Franc'),
    "CDF": t('gestion', 'Congolese Franc'),
    "CRC": t('gestion', 'Costa Rican Colon'),
    "HRK": t('gestion', 'Croatian Kuna'),
    "CUC": t('gestion', 'Cuban Convertible Peso'),
    "CZK": t('gestion', 'Czech Republic Koruna'),
    "DKK": t('gestion', 'Danish Krone'),
    "DJF": t('gestion', 'Djiboutian Franc'),
    "DOP": t('gestion', 'Dominican Peso'),
    "XCD": t('gestion', 'East Caribbean Dollar'),
    "EGP": t('gestion', 'Egyptian Pound'),
    "ERN": t('gestion', 'Eritrean Nakfa'),
    "EEK": t('gestion', 'Estonian Kroon'),
    "ETB": t('gestion', 'Ethiopian Birr'),
    "FKP": t('gestion', 'Falkland Islands Pound'),
    "FJD": t('gestion', 'Fijian Dollar'),
    "GMD": t('gestion', 'Gambian Dalasi'),
    "GEL": t('gestion', 'Georgian Lari'),
    "DEM": t('gestion', 'German Mark'),
    "GHS": t('gestion', 'Ghanaian Cedi'),
    "GIP": t('gestion', 'Gibraltar Pound'),
    "GRD": t('gestion', 'Greek Drachma'),
    "GTQ": t('gestion', 'Guatemalan Quetzal'),
    "GNF": t('gestion', 'Guinean Franc'),
    "GYD": t('gestion', 'Guyanaese Dollar'),
    "HTG": t('gestion', 'Haitian Gourde'),
    "HNL": t('gestion', 'Honduran Lempira'),
    "HKD": t('gestion', 'Hong Kong Dollar'),
    "HUF": t('gestion', 'Hungarian Forint'),
    "ISK": t('gestion', 'Icelandic Kana'),
    "INR": t('gestion', 'Indian Rupee'),
    "IDR": t('gestion', 'Indonesian Rupiah'),
    "IRR": t('gestion', 'Iranian Rial'),
    "IQD": t('gestion', 'Iraqi Dinar'),
    "ILS": t('gestion', 'Israeli New Sheqel'),
    "ITL": t('gestion', 'Italian Lira'),
    "JMD": t('gestion', 'Jamaican Dollar'),
    "JOD": t('gestion', 'Jordanian Dinar'),
    "KZT": t('gestion', 'Kazakhstani Tenge'),
    "KES": t('gestion', 'Kenyan Shilling'),
    "KWD": t('gestion', 'Kuwaiti Dinar'),
    "KGS": t('gestion', 'Kyrgystani Som'),
    "LAK": t('gestion', 'Laotian Kip'),
    "LVL": t('gestion', 'Latvian Lats'),
    "LBP": t('gestion', 'Lebanese Pound'),
    "LSL": t('gestion', 'Lesotho Loti'),
    "LRD": t('gestion', 'Liberian Dollar'),
    "LYD": t('gestion', 'Libyan Dinar'),
    "LTL": t('gestion', 'Lithuanian Litas'),
    "MOP": t('gestion', 'Macanese Pataca'),
    "MKD": t('gestion', 'Macedonian Denar'),
    "MGA": t('gestion', 'Malagasy Ariary'),
    "MWK": t('gestion', 'Malawian Kwacha'),
    "MYR": t('gestion', 'Malaysian Ringgit'),
    "MVR": t('gestion', 'Maldivian Rufiyaa'),
    "MRO": t('gestion', 'Mauritanian Ouguiya'),
    "MUR": t('gestion', 'Mauritian Rupee'),
    "MXN": t('gestion', 'Mexican Peso'),
    "MDL": t('gestion', 'Moldovan Leu'),
    "MNT": t('gestion', 'Mongolian Tugrik'),
    "MAD": t('gestion', 'Moroccan Dirham'),
    "MZM": t('gestion', 'Mozambican Metical'),
    "MMK": t('gestion', 'Myanmar Kyat'),
    "NAD": t('gestion', 'Namibian Dollar'),
    "NPR": t('gestion', 'Nepalese Rupee'),
    "ANG": t('gestion', 'Netherlands Antillean Guilder'),
    "TWD": t('gestion', 'New Taiwan Dollar'),
    "NZD": t('gestion', 'New Zealand Dollar'),
    "NIO": t('gestion', 'Nicaraguan Cadoba'),
    "NGN": t('gestion', 'Nigerian Naira'),
    "KPW": t('gestion', 'North Korean Won'),
    "NOK": t('gestion', 'Norwegian Krone'),
    "OMR": t('gestion', 'Omani Rial'),
    "PKR": t('gestion', 'Pakistani Rupee'),
    "PAB": t('gestion', 'Panamanian Balboa'),
    "PGK": t('gestion', 'Papua New Guinean Kina'),
    "PYG": t('gestion', 'Paraguayan Guarani'),
    "PEN": t('gestion', 'Peruvian Nuevo Sol'),
    "PHP": t('gestion', 'Philippine Peso'),
    "PLN": t('gestion', 'Polish Zloty'),
    "QAR": t('gestion', 'Qatari Rial'),
    "RON": t('gestion', 'Romanian Leu'),
    "RUB": t('gestion', 'Russian Ruble'),
    "RWF": t('gestion', 'Rwandan Franc'),
    "SVC": t('gestion', 'Salvadoran Colon'),
    "WST": t('gestion', 'Samoan Tala'),
    "SAR": t('gestion', 'Saudi Riyal'),
    "RSD": t('gestion', 'Serbian Dinar'),
    "SCR": t('gestion', 'Seychellois Rupee'),
    "SLL": t('gestion', 'Sierra Leonean Leone'),
    "SGD": t('gestion', 'Singapore Dollar'),
    "SKK": t('gestion', 'Slovak Koruna'),
    "SBD": t('gestion', 'Solomon Islands Dollar'),
    "SOS": t('gestion', 'Somali Shilling'),
    "ZAR": t('gestion', 'South African Rand'),
    "KRW": t('gestion', 'South Korean Won'),
    "XDR": t('gestion', 'Special Drawing Rights'),
    "LKR": t('gestion', 'Sri Lankan Rupee'),
    "SHP": t('gestion', 'St. Helena Pound'),
    "SDG": t('gestion', 'Sudanese Pound'),
    "SRD": t('gestion', 'Surinamese Dollar'),
    "SZL": t('gestion', 'Swazi Lilangeni'),
    "SEK": t('gestion', 'Swedish Krona'),
    "CHF": t('gestion', 'Swiss Franc'),
    "SYP": t('gestion', 'Syrian Pound'),
    "STD": t('gestion', 'Sao Tome and Príncipe Dobra'),
    "TJS": t('gestion', 'Tajikistani Somoni'),
    "TZS": t('gestion', 'Tanzanian Shilling'),
    "THB": t('gestion', 'Thai Baht'),
    "TOP": t('gestion', 'Tongan Pa anga'),
    "TTD": t('gestion', 'Trinidad & Tobago Dollar'),
    "TND": t('gestion', 'Tunisian Dinar'),
    "TRY": t('gestion', 'Turkish Lira'),
    "TMT": t('gestion', 'Turkmenistani Manat'),
    "UGX": t('gestion', 'Ugandan Shilling'),
    "UAH": t('gestion', 'Ukrainian Hryvnia'),
    "AED": t('gestion', 'United Arab Emirates Dirham'),
    "UYU": t('gestion', 'Uruguayan Peso'),
    "UZS": t('gestion', 'Uzbekistan Som'),
    "VUV": t('gestion', 'Vanuatu Vatu'),
    "VEF": t('gestion', 'Venezuelan Bolivar'),
    "VND": t('gestion', 'Vietnamese Dong'),
    "YER": t('gestion', 'Yemeni Rial'),
    "ZMK": t('gestion', 'Zambian Kwacha')
};

export function getFormatList(currentFormat) {
    var list = "";
    var oEntries = Object.entries(format_List);
    var oEntriesSort = oEntries.sort((a,b) => a[1].localeCompare(b[1]));
    for (const [key, value] of oEntriesSort) {
        if (currentFormat === key) {
            list += "<option selected value='" + key + "'>" + value + "</option>";
        } else {
            list += "<option value='" + key + "'>" + value + "</option>";
        }
    }
    return list;
}


export function getCurrencyList(currentDevise) {
    var list = "";
    var oEntries = Object.entries(currency_list);
    var oEntriesSort = oEntries.sort((a,b) => a[1].localeCompare(b[1]));
    for (const [key, value] of oEntriesSort) {
        if (currentDevise === key) {
            list += "<option selected value='" + key + "'>" + value + "</option>";
        } else {
            list += "<option value='" + key + "'>" + value + "</option>";
        }
    }
    return list;
}

export function getAutoIncrement(activate){
    if(activate == 0){
        return "<option selected value='0'>" + t('gestion', 'Disable') + "</option><option value='1'>" + t('gestion', 'Enable') + "</option>"
    }else{
        return "<option value='0'>" + t('gestion', 'Disable') + "</option><option selected value='1'>" + t('gestion', 'Enable') + "</option>"
    }
}

export function getFormatNumber(format){

}
