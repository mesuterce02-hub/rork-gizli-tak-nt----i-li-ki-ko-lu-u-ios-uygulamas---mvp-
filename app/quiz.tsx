import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  Animated
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { PrimaryButton } from '@/components/PrimaryButton';

interface QuizAnswer {
  text: string;
  emoji: string;
  points: {
    EIP?: number; // Eski İlişki Puanı
    MIP?: number; // Mevcut İlişki Puanı
    YIP?: number; // Yeni İlişki Puanı
  };
}

interface QuizQuestion {
  id: number;
  type: 'question' | 'info';
  title: string;
  subtitle?: string;
  question?: string;
  answers?: QuizAnswer[];
  multiSelect?: boolean;
  buttonText?: string;
  infoText?: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    type: 'question',
    title: 'Merhaba! Hadi senin için uygulamayı kişiselleştirelim. Sadece 1 dakika sürer!',
    question: 'Yaşınız nedir?',
    answers: [
      { text: '18-29', emoji: '🌸', points: {} },
      { text: '30-39', emoji: '🌺', points: {} },
      { text: '40-49', emoji: '🌹', points: {} },
      { text: '50+', emoji: '💐', points: {} }
    ]
  },
  {
    id: 2,
    type: 'info',
    title: 'Binlerce Kadın Yanılıyor Olamaz...',
    infoText: '100.000\'den fazla kadın, ilişkilerinde aradığı mutluluğu ve gücü bizim yöntemlerimizle keşfetti.',
    buttonText: 'Devam Et'
  },
  {
    id: 3,
    type: 'question',
    title: 'Ana Hedef',
    question: 'Bu uygulama ile ulaşmak istediğiniz en önemli hedef nedir?',
    answers: [
      { text: 'Hayatıma doğru erkeği çekmek', emoji: '💕', points: { YIP: 10 } },
      { text: 'Eski partnerimi geri kazanmak', emoji: '💔', points: { EIP: 10 } },
      { text: 'Evlenmek ve ciddi bir ilişki kurmak', emoji: '💍', points: { YIP: 5, MIP: 2 } },
      { text: 'İlişkimdeki o ilk kıvılcımı yeniden alevlendirmek', emoji: '🔥', points: { MIP: 10 } }
    ]
  },
  {
    id: 4,
    type: 'question',
    title: 'İlişki Durumu',
    question: 'Şu anki ilişki durumunuz nedir?',
    answers: [
      { text: 'Bekarım', emoji: '🦋', points: { YIP: 5 } },
      { text: 'İlişkim var / Evliyim', emoji: '💑', points: { MIP: 5 } },
      { text: 'İlişkimden Ayrıldım', emoji: '💙', points: { EIP: 5 } },
      { text: 'Durumum biraz karmaşık', emoji: '🤔', points: {} }
    ]
  },
  {
    id: 5,
    type: 'question',
    title: 'Mevcut Duygu Durumu',
    question: 'Şu an aşk hayatınız hakkında ne hissediyorsunuz?',
    answers: [
      { text: 'İlişkim devam ediyor ve ama daha iyi olabilir', emoji: '😊', points: { MIP: 2 } },
      { text: 'Yeni bir ilişkiye adım atmak istiyorum', emoji: '🌟', points: { YIP: 2 } },
      { text: 'Eski ilişkim aklımdan çıkmıyor ve onu özlüyorum', emoji: '😔', points: { EIP: 3 } }
    ]
  },
  {
    id: 6,
    type: 'question',
    title: 'Fedakarlık Düzeyi',
    question: 'İlişkilerinizde ne sıklıkla, aldığınızdan daha fazlasını verdiğinizi hissediyorsunuz?',
    answers: [
      { text: 'Çok sık', emoji: '😰', points: {} },
      { text: 'Bazen', emoji: '🤷‍♀️', points: {} },
      { text: 'Neredeyse hiç', emoji: '😌', points: {} }
    ]
  },
  {
    id: 7,
    type: 'question',
    title: 'En Büyük Zorluklar',
    question: 'Aşk hayatınızdaki en büyük zorluklar nelerdir? (Uygun olanların tümünü seçin)',
    multiSelect: true,
    answers: [
      { text: 'Eski sevgilimi aklımdan çıkaramıyorum / onu özlüyorum', emoji: '💭', points: { EIP: 3 } },
      { text: 'Yeni biriyle ilişki istiyorum ama bunu yapmaya korkuyorum', emoji: '😨', points: { YIP: 3 } },
      { text: 'Hayatıma doğru insanları çekemiyorum.', emoji: '🎯', points: { YIP: 3 } },
      { text: 'İlişkide yeterince sevildiğimi ve değerli olduğumu hissetmiyorum.', emoji: '💔', points: { EIP: 2, MIP: 2 } },
      { text: 'Aramızdaki o ilk tutkunun ve heyecanın bittiğini hissediyorum.', emoji: '🌪️', points: { MIP: 3 } }
    ]
  },
  {
    id: 8,
    type: 'info',
    title: 'Sizi Anlıyoruz...',
    infoText: 'Bu duyguları paylaştığınız için teşekkürler. Yalnız olmadığınızı ve bu durumu değiştirmenin bir yolu olduğunu bilin!',
    buttonText: 'Devam Et'
  },
  {
    id: 9,
    type: 'question',
    title: 'Değer Görme Zamanı',
    question: 'Bir ilişkide en son ne zaman gerçekten sevildiğinizi ve öncelik olduğunuzu hissettiniz?',
    answers: [
      { text: 'Son bir yıl içinde', emoji: '💖', points: {} },
      { text: '1-3 yıl önce', emoji: '💭', points: {} },
      { text: 'Hiçbir zaman', emoji: '💔', points: {} },
      { text: 'Şu an tam olarak böyle hissediyorum', emoji: '🥰', points: {} }
    ]
  },
  {
    id: 10,
    type: 'info',
    title: 'Zorlukları Zafere Dönüştürün!',
    infoText: 'Araştırmalara göre, kadınların %63\'ü hayatlarının bir döneminde aşk hayatlarında ciddi zorluklarla karşılaşıyor. Ama doğru rehberlikle, bu zorluklar en büyük başarı hikayelerine dönüşebilir!',
    buttonText: 'Devam Et'
  },
  {
    id: 11,
    type: 'question',
    title: 'Etki İsteği',
    question: 'Erkeklerin ve ilişkinizin dinamiği üzerinde daha fazla kontrol ve etki sahibi olmayı ister miydiniz?',
    answers: [
      { text: 'Evet, kesinlikle!', emoji: '💪', points: {} },
      { text: 'Hayır, gerek yok', emoji: '🤷‍♀️', points: {} },
      { text: 'Emin değilim', emoji: '🤔', points: {} }
    ]
  },
  {
    id: 12,
    type: 'question',
    title: 'Sevgi Dili',
    question: 'Partnerinizin size düşünceli hediyeler ve sürprizlerle sevgisini göstermesi hoşunuza gider miydi?',
    answers: [
      { text: 'Evet, harika olurdu', emoji: '🎁', points: {} },
      { text: 'Belki', emoji: '🤷‍♀️', points: {} },
      { text: 'Benim için öncelik değil', emoji: '😐', points: {} }
    ]
  },
  {
    id: 13,
    type: 'question',
    title: 'Değerler',
    question: 'Bir partnerde olması gereken en önemli özellik sizce nedir?',
    answers: [
      { text: 'Sadakat', emoji: '💍', points: {} },
      { text: 'Nezaket', emoji: '🌸', points: {} },
      { text: 'İlgi ve Özen', emoji: '💕', points: {} },
      { text: 'Destekleyici Olması', emoji: '🤝', points: {} },
      { text: 'Aileye Önem Vermesi', emoji: '👨‍👩‍👧‍👦', points: {} }
    ]
  },
  {
    id: 14,
    type: 'question',
    title: 'Tutku Arzusu',
    question: 'Sizi hayatının önceliği haline getiren ve size tutkuyla bağlı bir erkekle birlikte olma fikri size nasıl geliyor?',
    answers: [
      { text: 'Hayallerimdeki ilişki bu!', emoji: '😍', points: {} },
      { text: 'Kulağa hoş geliyor', emoji: '😊', points: {} },
      { text: 'Belki', emoji: '🤔', points: {} },
      { text: 'Bu kadar yoğun bir ilgi beni boğabilir', emoji: '😰', points: {} }
    ]
  },
  {
    id: 15,
    type: 'info',
    title: 'O Kadınlardan Biri Olun!',
    infoText: 'Partnerleri tarafından hayranlıkla bakılan ve ilişkilerinde mutlu olan kadınların arasına bugün katılın!',
    buttonText: 'Devam Et'
  },
  {
    id: 16,
    type: 'question',
    title: 'Erkekleri Anlama Seviyesi',
    question: 'Erkekleri ne kadar iyi anladığınızı düşünüyorsunuz?',
    answers: [
      { text: 'Çok iyi, adeta aklını okuyabiliyorum', emoji: '🔮', points: {} },
      { text: 'Bazen ne düşündüğünü anlamakta zorlanıyorum', emoji: '🤷‍♀️', points: {} },
      { text: 'Genellikle ne düşündüğü hakkında hiçbir fikrim olmuyor', emoji: '❓', points: {} }
    ]
  },
  {
    id: 17,
    type: 'question',
    title: 'Bilinen Taktikler',
    question: 'Aşağıdaki "Sağlıklı İlişki" tekniklerinden hangilerini daha önce duydunuz veya denediniz? (Uygun olanların tümünü seçin)',
    multiSelect: true,
    answers: [
      { text: 'Her şeye "Evet" dememek', emoji: '🚫', points: {} },
      { text: '"Temas Yok" (No Contact) kuralı', emoji: '📵', points: {} },
      { text: 'Gizemli davranmak', emoji: '🎭', points: {} },
      { text: 'Ulaşılmaz olmak', emoji: '🏔️', points: {} },
      { text: 'Konuşmayı ilk bitiren olmak', emoji: '👋', points: {} },
      { text: 'Hiçbirini duymadım', emoji: '🤷‍♀️', points: {} }
    ]
  },
  {
    id: 18,
    type: 'question',
    title: 'Temasın Gücü',
    question: 'Erkeklerde doğru temasın, bağlanma hormonlarını (oksitosin gibi) harekete geçirerek size olan bağını güçlendirebileceğini biliyor muydunuz?',
    answers: [
      { text: 'Evet, bu gücü her zaman kullanırım', emoji: '💪', points: {} },
      { text: 'Merak ettim, daha fazlasını öğrenmek isterim', emoji: '🤔', points: {} },
      { text: 'Hayır, bu benim için tamamen yeni bir bilgi', emoji: '😮', points: {} }
    ]
  },
  {
    id: 19,
    type: 'question',
    title: 'Aktif Dinlemenin Gücü',
    question: 'Onu sadece dinlemek yerine, \'aktif dinleme\' tekniklerini kullanmanın, ona kendini değerli hissettirerek sizinle olan bağını derinleştirebileceğini biliyor muydunuz?',
    answers: [
      { text: 'Evet, bunu duymuştum', emoji: '👂', points: {} },
      { text: 'Kulağa ilginç geliyor', emoji: '🤔', points: {} },
      { text: 'Hayır, bu benim için yeni', emoji: '😮', points: {} }
    ]
  },
  {
    id: 20,
    type: 'question',
    title: 'En Çok İstenen Stratejiler',
    question: 'En çok hangi stratejileri öğrenmek istersiniz? (En çok merak ettiğiniz 1-2 tanesini seçin)',
    multiSelect: true,
    answers: [
      { text: 'Onu bana nasıl tutkuyla bağlarım?', emoji: '🔥', points: {} },
      { text: 'Beni deli gibi özlemesini nasıl sağlarım?', emoji: '💭', points: {} },
      { text: 'Aklından geçenleri nasıl daha iyi okuyabilirim?', emoji: '🔮', points: {} },
      { text: 'Bana yeniden aşık olmasını nasıl sağlarım?', emoji: '💕', points: {} },
      { text: 'İlişkide daha fazla inisiyatif almasını nasıl sağlarım?', emoji: '💪', points: {} }
    ]
  },
  {
    id: 21,
    type: 'info',
    title: 'Ustalığınızı Geliştirin!',
    infoText: 'Aşk hayatında ipleri eline alan ve mutlu olan o %10\'luk kadın dilimine katılmaya hazırsınız!',
    buttonText: 'Sonuçlarımı Göster'
  }
];

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [, setAnswers] = useState<Record<number, any>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [scores, setScores] = useState({ EIP: 0, MIP: 0, YIP: 0 });
  const [fadeAnim] = useState(new Animated.Value(1));

  const currentQuestion = quizData[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

  const handleAnswerSelect = (answerIndex: number, answer: QuizAnswer) => {
    console.log('Answer selected:', answer.text);
    
    if (currentQuestion.multiSelect) {
      const newSelectedAnswers = selectedAnswers.includes(answerIndex)
        ? selectedAnswers.filter(i => i !== answerIndex)
        : [...selectedAnswers, answerIndex];
      setSelectedAnswers(newSelectedAnswers);
      return;
    }

    // Update scores
    const newScores = { ...scores };
    if (answer.points.EIP) newScores.EIP += answer.points.EIP;
    if (answer.points.MIP) newScores.MIP += answer.points.MIP;
    if (answer.points.YIP) newScores.YIP += answer.points.YIP;
    setScores(newScores);

    // Save answer
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));

    // Auto advance to next question
    setTimeout(() => {
      nextQuestion();
    }, 300);
  };

  const handleMultiSelectContinue = () => {
    if (selectedAnswers.length === 0) return;

    // Update scores for all selected answers
    const newScores = { ...scores };
    selectedAnswers.forEach(answerIndex => {
      const answer = currentQuestion.answers![answerIndex];
      if (answer.points.EIP) newScores.EIP += answer.points.EIP;
      if (answer.points.MIP) newScores.MIP += answer.points.MIP;
      if (answer.points.YIP) newScores.YIP += answer.points.YIP;
    });
    setScores(newScores);

    // Save answers
    const selectedAnswerObjects = selectedAnswers.map(i => currentQuestion.answers![i]);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswerObjects }));
    
    setSelectedAnswers([]);
    nextQuestion();
  };

  const nextQuestion = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz completed, navigate to results
        console.log('Quiz completed. Final scores:', scores);
        navigateToResults();
      }
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const navigateToResults = () => {
    // Determine which avatar based on highest score
    const maxScore = Math.max(scores.EIP, scores.MIP, scores.YIP);
    let resultType = 'yeni'; // default
    
    if (maxScore === scores.EIP) {
      resultType = 'eski';
    } else if (maxScore === scores.MIP) {
      resultType = 'mevcut';
    }
    
    console.log('Navigating to loading with type:', resultType, 'scores:', scores);
    router.push(`/loading?type=${resultType}&eip=${scores.EIP}&mip=${scores.MIP}&yip=${scores.YIP}`);
  };

  const handleInfoContinue = () => {
    nextQuestion();
  };

  if (currentQuestion.type === 'info') {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>{currentQuestion.title}</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>{currentQuestion.infoText}</Text>
              </View>
              
              <PrimaryButton
                title={currentQuestion.buttonText || 'Devam Et'}
                onPress={handleInfoContinue}
                style={styles.continueButton}
                testID={`info-continue-${currentQuestion.id}`}
              />
            </View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
            {currentQuestion.question && (
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
            )}
            
            <View style={styles.answersContainer}>
              {currentQuestion.answers?.map((answer, index) => {
                const isSelected = currentQuestion.multiSelect 
                  ? selectedAnswers.includes(index)
                  : false;
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.answerButton,
                      isSelected && styles.answerButtonSelected
                    ]}
                    onPress={() => handleAnswerSelect(index, answer)}
                    testID={`answer-${index}`}
                  >
                    <Text style={styles.answerEmoji}>{answer.emoji}</Text>
                    <Text style={[
                      styles.answerText,
                      isSelected && styles.answerTextSelected
                    ]}>
                      {answer.text}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {currentQuestion.multiSelect && (
              <PrimaryButton
                title="Devam Et"
                onPress={handleMultiSelectContinue}
                style={[
                  styles.continueButton,
                  selectedAnswers.length === 0 && styles.continueButtonDisabled
                ]}
                disabled={selectedAnswers.length === 0}
                testID="multiselect-continue"
              />
            )}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.cardBorder,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  questionContainer: {
    flex: 1,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
  },
  answersContainer: {
    gap: 16,
    marginBottom: 32,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.cardBorder,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  answerButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.cardBackground,
  },
  answerEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  answerText: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  answerTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: Colors.cardBackground,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  infoText: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
  },
  continueButton: {
    width: '100%',
    marginTop: 16,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
});