import React, { useState, useEffect } from 'react';
import { Alert, TextInput, TouchableOpacity, Text, View } from 'react-native';
import emailjs from 'emailjs-com';

const [couponCodes, setCouponCodes] = useState([]);
const [usedCoupons, setUsedCoupons] = useState([]);
const [userCouponInput, setUserCouponInput] = useState("");
const [alerts, setAlerts] = useState([]);
const [newAlert, setNewAlert] = useState({ keyword: "", category: "" });
const [newListings, setNewListings] = useState([]);
const [userEmail, setUserEmail] = useState("kullanici@example.com");
const [emailNotifications, setEmailNotifications] = useState([]);

const sendEmailNotification = (to, message) => {
  const templateParams = {
    to_email: to,
    message: message
  };

  emailjs.send('your_service_id', 'your_template_id', templateParams, 'your_user_id')
    .then(() => {
      console.log("Email başarıyla gönderildi");
    }, (error) => {
      console.error("Email gönderme hatası:", error);
    });
};

useEffect(() => {
  const interval = setInterval(() => {
    alerts.forEach(alert => {
      const matching = newListings.find(listing =>
        listing.category === alert.category && listing.title.toLowerCase().includes(alert.keyword.toLowerCase())
      );
      if (matching) {
        const msg = `Kategori: ${alert.category} için '${alert.keyword}' eşleşen ilan bulundu.`;
       window.alert(...)("Yeni İlan Uyarısı", msg);
        setEmailNotifications(prev => [...prev, { to: userEmail, message: msg }]);
        sendEmailNotification(userEmail, msg);
      }
    });
  }, 10000);

  return () => clearInterval(interval);
}, [alerts, newListings]);

const simulateNewListing = () => {
  const fake = { category: "Emlak", title: "Deniz manzaralı daire" };
  setNewListings([...newListings, fake]);
};

const removeAlert = (index) => {
  const updated = [...alerts];
  updated.splice(index, 1);
  setAlerts(updated);
};

const addAlert = () => {
  if (newAlert.keyword && newAlert.category) {
    setAlerts([...alerts, newAlert]);
    setNewAlert({ keyword: "", category: "" });
   window.alert(...)("Alarm Eklendi", "Yeni arama alarmı başarıyla tanımlandı.");
  } else {
    window.alert(...)("Eksik Bilgi", "Lütfen kategori ve anahtar kelime girin.");
  }
};

const renderAlerts = () => (
  <View className="mt-10">
    <Text className="text-xl font-bold text-gray-700 mb-2">Arama Alarmları</Text>
    {alerts.map((alert, index) => (
      <View key={index} className="border p-2 mb-2 rounded bg-blue-50">
        <Text className="text-blue-900">Kategori: {alert.category} | Anahtar: {alert.keyword}</Text>
        <TouchableOpacity onPress={() => removeAlert(index)} className="mt-1 bg-red-500 px-2 py-1 rounded">
          <Text className="text-white text-center">Sil</Text>
        </TouchableOpacity>
      </View>
    ))}
    <TextInput
      placeholder="Kategori (örn. Emlak)"
      value={newAlert.category}
      onChangeText={(text) => setNewAlert({ ...newAlert, category: text })}
      className="border p-2 mb-2 rounded"
    />
    <TextInput
      placeholder="Anahtar kelime (örn. deniz manzaralı)"
      value={newAlert.keyword}
      onChangeText={(text) => setNewAlert({ ...newAlert, keyword: text })}
      className="border p-2 mb-2 rounded"
    />
    <TouchableOpacity onPress={addAlert} className="bg-blue-600 py-2 rounded">
      <Text className="text-white text-center font-bold">Alarm Ekle</Text>
    </TouchableOpacity>
    <Text className="text-lg font-bold text-gray-800 mt-4">E-Posta Bildirimleri (Simülasyon)</Text>
    {emailNotifications.map((note, index) => (
      <View key={index} className="bg-green-50 border p-2 mt-2 rounded">
        <Text>To: {note.to}</Text>
        <Text>Mesaj: {note.message}</Text>
      </View>
    ))}
  </View>
);
