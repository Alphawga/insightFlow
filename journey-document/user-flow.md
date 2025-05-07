User Experience Flow diagram for InsightFlow Solo. This flow focuses on the primary user paths and how different features connect within the user journey, emphasizing the integration of AI components.
(Screen/State): Major view or state the user is in.
[Action/Process]: User action or system process.
{Feature}: Specific feature being utilized.
<Decision>: A branching point based on user choice or system logic.
-->: Path of interaction.
AI->: Indicates an AI-driven process or output.
(Note): Clarification or context.

InsightFlow Solo - High-Level UX Flow
Phase 1: Onboarding & Initial Setup
(Website/App Entry Point)
 --> <New or Returning User?>
 --> [Returning User] --> (Login Screen)
 --> [New User] --> (Sign Up Options)


(Sign Up Options)
 --> [Choose Email/Password] --> [Enter Details] --> {Email/Password Sign-Up} --> [Submit] --> (Email Verification Pending) --> [User Clicks Verification Link] --> {Account Email Verification Process} --> (Login Screen)
 --> [Choose Google SSO] --> {Google Social Sign-On (SSO)} --> [Google Auth Flow] --> (If first time) --> (Conversational Onboarding Start)


(Login Screen)
 --> [Enter Credentials / Use Google SSO] --> <First Login?>
 --> [Yes] --> (Conversational Onboarding Start)
 --> [No] --> (Main Dashboard)


(Conversational Onboarding Start)
 --> [Display Welcome/Intro]
 --> {Onboarding - Ask Business Type} --> [User Inputs Type]
 --> {Onboarding - Ask Primary Goals} --> [User Selects/Inputs Goals]
 --> {Onboarding - Predictive Feature Opt-In & Explanation} --> <User Opts In?>
 --> [Yes/No] --> (Store Preference)
 --> {Onboarding - AI-Powered Quick Tour} --> <User Takes Tour?>
 --> [Yes] --> [Highlight Key UI Areas] --> (Integration Hub)
 --> [No/Skip] --> (Integration Hub)


(Integration Hub - Onboarding Context)
 --> AI-> {Onboarding - AI Suggestion for Relevant Channel Connections} --> [Display Suggested & Other Connections]
 --> [User Selects Connection (e.g., Shopify)] --> {Connect Sales Source - Shopify Integration} --> [OAuth Flow] --> [Confirmation] --> (Integration Hub)
 --> [User Selects Connection (e.g., GA4)] --> {Connect Website Analytics - GA4 Integration} --> [OAuth Flow] --> [Confirmation] --> (Integration Hub)
 --> [User Selects Connection (e.g., Meta Ads)] --> {Connect Marketing Channel - Meta Ads Integration} --> [OAuth Flow] --> [Confirmation] --> (Integration Hub)
 --> (Repeat for other desired connections: Etsy, Stripe, PayPal, Google Ads, Mailchimp, Klaviyo etc.)
 --> [User Clicks "Next" / "Done Connecting"] --> (Manual Cost Input Screen)


(Manual Cost Input Screen)
 --> {Manual Input for Average COGS (%)} --> [User Enters COGS]
 --> {Manual Input for Fixed Monthly Costs ($)} --> [User Enters Fixed Costs]
 --> [User Clicks "Finish Setup"] --> AI-> {AI Confirmation & Baseline Analysis Trigger} (Background Task) --> (Main Dashboard)



Phase 2: Core Application Usage
(Main Dashboard) - {Core Dashboard Layout & Responsive Grid Structure}


Displays:
{Global Date Range Selector Component}
{Sales/Revenue Widget} AI-> {LLM Widget Summary - Sales/Revenue (with Prediction)} AI-> {Predictive Chart Overlays}
{Orders & Customers Widget} AI-> {LLM Widget Summary - Orders/Customers (with Projection)}
{Top Traffic Sources Widget} AI-> {LLM Widget Summary - Traffic Sources (with Predictive Context)}
{Estimated Profit Snapshot Widget} AI-> {LLM Widget Summary - Profit Snapshot (with Forward Look)}
{Goal Tracker Widget} AI-> {LLM Widget Summary - Goal Tracker (with Likelihood Prediction)}
{Recent Activity Feed Widget}
Navigation via {Basic Navigation Menu (Dashboard, Channels, Insights, Settings)}
[User Clicks "Channels" Nav / Channel Widget] --> (Channel Performance Views)







(Channel Performance Views)
 --> <Select Channel Type (Sales, Traffic, Email, Social, Ads)>
 --> (Specific Channel View - e.g., Sales)
 * Displays: {Sales & Orders Trend Chart View} AI-> {Predictive Chart Overlays}, {Top Selling Products/Services List View}, {Basic Customer List View}
 * AI-> {LLM Section Summary Generation}
 * AI-> {Contextual Predictive Insights within Channel Views}
 --> (Specific Channel View - e.g., Traffic)
 * Displays: {Website Key Metrics Overview}, {Top Traffic Sources Breakdown}, {Top Visited Pages}
 * AI-> {LLM Section Summary Generation}
 * AI-> {Contextual Predictive Insights within Channel Views}
 --> (Similar detailed views for Email, Social, Ads with their respective features and AI summaries/insights)
 --> [Navigate Back/To Other Channels/Dashboard]


[User Clicks "Insights" Nav] --> (AI Insight Feed)


(AI Insight Feed) - {AI Insight Feed UI Component}


Displays Cards:
AI-> {AI Insight - Performance Summary Generation}
AI-> {AI Insight - Anomaly Detection Model & Alert Generation}
AI-> {AI Insight - Opportunity Identification & Suggestion Generation}
AI-> {AI Insight - Risk Prediction & Warning Generation}
--> [User Clicks Insight Card] --> [Show Details] AI-> {AI Insight - LLM Explanation Generation ("Why")}



[User Interacts with "Ask InsightFlow"] (Persistent UI Element?)
 --> { "Ask InsightFlow" Input Query Box UI} --> [User Types Question (e.g., "Predict sales")]
 --> AI-> {LLM Query Interpretation Engine}
 --> AI-> {Data Retrieval & Formatting based on NL Query} --> {NL Query - Basic Predictive Question Handling}
 --> AI-> {NL Query Response Generation} --> [Display Answer/Chart in UI]



Phase 3: Advanced AI & Reporting (Potential Growth Tier Features)
[User Navigates to "Forecast & Plan" Hub] --> (Forecast & Plan Hub)


(Forecast & Plan Hub) - { "Forecast & Plan" Hub UI & Navigation}
 --> [Select "Detailed Forecast"] --> {Detailed Forecast View} --> [Select Metric/Horizon] --> [View Chart] --> [Hover Point] AI-> {LLM Context Generation for Forecast Chart Hover Points}
 --> [Select "Scenario Planning"] --> {Natural Language Scenario Planning - Input Interface} --> [User Types Scenario] --> AI-> {Simplified Predictive Model Execution} --> AI-> {LLM Response Generation (Explaining impact)}
 --> [Select "Goal Simulator"] --> {Goal Achievement Simulator - UI & Goal Selection} --> [Select Goal] --> AI-> {Goal Achievement Simulator - AI Analysis & Suggestion Generation}


[User Navigates to "Reports"] --> (Simplified AI-Powered Reporting)


(Simplified AI-Powered Reporting)
 --> [View Report Templates] ({Weekly Snapshot}, {Monthly Review}, {Marketing Check-up}, etc.)
 --> [User Selects Template & Clicks "Generate"] --> AI-> {Report Generation Engine (Populating templates with data & AI summaries)} --> (Generated Report View)
 --> [User Clicks "Export"] --> {Report Export Functionality (PDF, CSV)}
 --> (Background/Scheduled) AI-> {Automated Weekly Email Digest} (Based on Notification Settings)


(Contextual Generative Marketing Assistance - Beta/Future)
 --> (Within relevant views like Social or Email) --> [Button/Prompt Appears] AI-> {Generative Suggestion - Social Media Post Ideas} / {Generative Suggestion - Email Subject Lines}



Phase 4: Account Management & Support
[User Clicks "Settings" Nav] --> (Settings Hub)


(Settings Hub)
 --> [Select "Profile"] --> (Profile Management Screen) --> {User Profile Management}, {Password Change Functionality}
 --> [Select "Billing"] --> (Billing Screen) --> {Billing & Subscription Management Interface}
 --> [Select "Goals"] --> (Goals Management Screen) --> {Business Goals Management}
 --> [Select "Costs"] --> (Cost Data Screen) --> {Cost Data Management}
 --> [Select "Notifications"] --> (Notification Preferences Screen) --> {Notification Preferences Management}
 --> [Select "Integrations"] --> (Connected Accounts Hub) --> {Connected Accounts Hub UI}, {Integration Status Indicators}, AI-> {AI-Powered Suggestion for New Connections}


[User Clicks "Help" Nav / "?" Icon] --> (Help Center)




(Help Center)
 --> {Searchable Help Center / FAQ Database} --> {Help Center - Natural Language Search Capability}
 --> [Browse Sections] --> {How-To Guides & Short Video Tutorials Section}, {Simple Glossary of Terms}
 --> [Contact Support] --> {Email Support Contact Form/Link} / {Live Chat Support Integration}
 --> [Interact with Chatbot] --> AI-> {AI Chatbot for Initial Support Queries}
 --> [Submit Feedback] --> {In-App Feedback Submission Tool}



Phase 5: Core Platform Actions
[User Clicks "Logout"] --> {Secure Log Out Functionality} --> [End Session] --> (Login Screen)


(Throughout Usage) --> {Session Management & Security} (Ongoing Background Process)


