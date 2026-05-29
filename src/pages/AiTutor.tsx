import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import Layout from '../components/Layout';
import type { ChatMessage } from '../types';

const SUGGESTED_QUESTIONS = [
  'What are the key stages of money laundering?',
  'What is a Politically Exposed Person (PEP)?',
  'What does MiFID II require for suitability assessments?',
  'How does Danske Bank approach ESG integration?',
  'What is the difference between CDD and EDD?',
  'When must I file a Suspicious Activity Report?',
];

const RESPONSES: Record<string, string> = {
  default: `I'm your Danske Bank AI Tutor. I can help you understand financial regulations, compliance requirements, and banking concepts relevant to your role. What would you like to learn about?`,
  money_laundering: `**Money laundering** typically occurs in three stages:

1. **Placement** — Introducing criminal proceeds into the financial system (e.g. cash deposits, currency exchange).

2. **Layering** — Disguising the trail through complex transactions to distance funds from their source (e.g. wire transfers, shell companies).

3. **Integration** — Returning the funds to the criminal as apparently legitimate assets (e.g. property purchases, business investments).

Under Danske Bank's AML framework, you must remain vigilant for all three stages when conducting customer due diligence.`,
  pep: `A **Politically Exposed Person (PEP)** is an individual who holds — or has held — a prominent public position, creating potential exposure to corruption or bribery risks.

**Categories include:**
- Heads of state, government ministers, senior politicians
- Senior judicial officials and military officers
- Senior executives of state-owned enterprises
- Immediate family members and known close associates

At Danske Bank, PEP relationships require:
- **Senior management approval** before onboarding
- **Enhanced Due Diligence (EDD)** including source of wealth verification
- **Annual review** of the relationship`,
  mifid: `**MiFID II suitability requirements** mandate that before recommending an investment product, Danske Bank must assess:

1. **Knowledge & Experience** — Does the client understand the product and its risks?
2. **Financial Situation** — Can they bear potential losses?
3. **Investment Objectives** — Does the product align with their goals and risk tolerance?

Key points:
- Suitability assessments apply to **advised** transactions
- **Appropriateness** checks (knowledge/experience only) apply to execution-only
- Records must be retained for **5 years**
- A **suitability statement** must be provided to the client`,
  esg: `Danske Bank's **ESG & Sustainability strategy** is guided by the goal of being a responsible bank for a changing world:

**Key pillars:**
- **Climate** — Aligning lending and investment portfolios with the Paris Agreement; net-zero commitments
- **Social** — Financial inclusion, responsible lending, employee wellbeing
- **Governance** — Rebuilding trust post-2018, strong compliance culture

**For client-facing roles:**
- SFDR (Sustainable Finance Disclosure Regulation) requires ESG risk disclosure
- Green and sustainable finance products are growing priority areas
- ESG factors must be integrated into investment advice under MiFID II`,
  cdd_edd: `**Customer Due Diligence (CDD)** is the baseline — verifying customer identity and understanding the nature of the relationship.

**Enhanced Due Diligence (EDD)** goes further and applies to higher-risk scenarios:

| Aspect | CDD | EDD |
|--------|-----|-----|
| Scope | All customers | High-risk customers |
| Identity verification | Standard | Additional sources |
| Source of funds | Basic understanding | Documented verification |
| Review frequency | Risk-based | At least annually |

**EDD triggers include:** PEPs, high-risk jurisdictions (FATF grey/black lists), complex structures, unusual transaction patterns.`,
  sar: `You must file a **Suspicious Activity Report (SAR)** when you:

- **Know** that a transaction involves criminal property
- **Suspect** it may involve money laundering or terrorist financing
- Have **reasonable grounds to suspect** based on available information

**Key rules:**
- The threshold is **low** — suspicion, not certainty
- File internally via Danske Bank's Financial Crime Compliance team first
- **Never tip off** the customer (a criminal offence)
- Keep a record of your reasoning whether or not you file
- Applies even if a transaction doesn't proceed`,
};

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('money launder') || lower.includes('placement') || lower.includes('layering')) return RESPONSES.money_laundering;
  if (lower.includes('pep') || lower.includes('politically exposed')) return RESPONSES.pep;
  if (lower.includes('mifid') || lower.includes('suitability')) return RESPONSES.mifid;
  if (lower.includes('esg') || lower.includes('sustainab') || lower.includes('climate')) return RESPONSES.esg;
  if (lower.includes('edd') || lower.includes('cdd') || lower.includes('due diligence')) return RESPONSES.cdd_edd;
  if (lower.includes('sar') || lower.includes('suspicious') || lower.includes('report')) return RESPONSES.sar;
  return `That's a great question about **"${message.slice(0, 60)}${message.length > 60 ? '…' : ''}"**.

For detailed guidance on this topic, I recommend:
- Checking the relevant module in your **Course Catalogue**
- Reviewing Danske Bank's internal policy documents on the intranet
- Attending the next **Live Session** on your Calendar

Is there a specific aspect of this topic you'd like me to explain in more detail?`;
}

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p class="mt-3">')
    .replace(/\n- /g, '</p><li class="mt-1">')
    .replace(/\n(\d+)\. /g, '</p><li class="mt-1">')
    .replace(/\n/g, '<br/>');
}

export default function AiTutor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: RESPONSES.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    const response = getResponse(text);
    const assistantMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() };
    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-65px)]">
        {/* Header */}
        <div className="px-6 lg:px-8 py-4 bg-white border-b border-danske-border flex-shrink-0">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-danske-navy flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-danske-cyan" />
            </div>
            <div>
              <h1 className="font-bold text-danske-text text-sm">AI Tutor</h1>
              <p className="text-xs text-danske-muted">Banking regulations · Compliance · Career guidance</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-3xl mx-auto space-y-5">
            {/* Suggested questions (shown initially) */}
            {messages.length === 1 && (
              <div>
                <p className="text-xs text-danske-muted text-center mb-3">Suggested questions</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTED_QUESTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 bg-white border border-danske-border rounded-full text-danske-text hover:border-danske-cyan hover:bg-danske-cyan/5 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'assistant' ? 'bg-danske-navy' : 'bg-danske-cyan'
                }`}>
                  {msg.role === 'assistant'
                    ? <Bot className="w-4 h-4 text-white" />
                    : <User className="w-4 h-4 text-danske-navy" />
                  }
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-danske-navy text-white rounded-tr-sm'
                    : 'bg-white border border-danske-border text-danske-text rounded-tl-sm'
                }`}>
                  {msg.role === 'assistant' ? (
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: `<p>${renderMarkdown(msg.content)}</p>` }}
                    />
                  ) : (
                    msg.content
                  )}
                  <div className={`text-[10px] mt-1.5 ${msg.role === 'user' ? 'text-white/50 text-right' : 'text-danske-muted'}`}>
                    {msg.timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-danske-navy flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-danske-border rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-danske-muted animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input */}
        <div className="px-6 lg:px-8 py-4 bg-white border-t border-danske-border flex-shrink-0">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about AML, GDPR, MiFID II, credit risk…"
              className="flex-1 px-4 py-3 bg-danske-gray border border-danske-border rounded-xl text-sm text-danske-text placeholder-danske-muted focus:outline-none focus:ring-2 focus:ring-danske-cyan focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 rounded-xl bg-danske-navy text-white flex items-center justify-center hover:bg-danske-navyLight transition-colors disabled:opacity-40 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-danske-muted text-center mt-2 max-w-3xl mx-auto">
            AI Tutor provides educational content only. Always refer to official Danske Bank policy for compliance decisions.
          </p>
        </div>
      </div>
    </Layout>
  );
}
