import Head from 'next/head'
import LayOutDefault from '@/components/LayOut/LayOutDefault'
import * as React from 'react';
import style from "@/styles/privacy.module.scss"
import Link from 'next/link';

interface IAppProps {
}

function Privacy (props: IAppProps) {
  return (
    <div style={{
        color:"white",
        display:"flex",
        justifyContent:"center"
    }}>
      <div style={{
        maxWidth:"1200px"
      }}>
        <div >
            <h4 >PopcornSound knows that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully and sensibly. By visiting PopcornSound you are accepting the practices described in this Privacy Notice.</h4>
            <br/><br/>
            <h3 className={style.h3}>What Personal Information About Users Does PopcornSound Gather?</h3>
            <p >The information we learn from users helps us personalize and continually improve your experience at PopcornSound. Here are the types of information we gather.</p>
            <ul className={style.ul}>
                <li className={style.li}>
                    <p >Information You Give Us: We receive and store any information you enter on the PopcornSound website or give us in any other way. Any information you enter in the Q&amp;A forums is publicly accessible on PopcornSound’s website, so be mindful of what you enter there. You can choose not to provide certain information, but then you might not be able to take advantage of many of our features.</p>
                </li>
                <li className={style.li}>
                    <p>Automatic Information: We automatically receive and store certain types of information whenever you use PopcornSound. For example, like many websites, we use "cookies," and we obtain certain types of information when your web browser or device accesses PopcornSound.</p>
                </li>
                <li className={style.li}>
                    <p >Information from Other Sources: We might receive information about you from other sources, such as your name and email address when you sign in to PopcornSound using a third-party login service.</p>
                </li>
            </ul>
            <br/><br/>
            <h3 className={style.h3}>For What Purposes Does PopcornSound Use Your Personal Information?</h3>
            <p >We use your personal information to operate, provide, develop, and improve the products and services that we offer PopcornSound users and customers. These purposes include:</p>
            <ul className={style.ul}>
                <li className={style.li}>
                    <p >Provide, troubleshoot, and improve PopcornSound services. We use your personal information to provide PopcornSound services, enhance functionality, analyze performance, fix errors, and improve the usability and effectiveness of PopcornSound.</p>
                </li>
                <li className={style.li}>
                    <p >Recommendations and personalization. We use your personal information to recommend content that might be of interest to you, identify your preferences, and personalize your experience with PopcornSound. For example, we use this information to track your PopcornSound song voting history, so we can correctly display PopcornSound content to you.</p>
                </li>
                <li className={style.li}>
                    <p >Communicate with you. We use your personal information to communicate with you in relation to PopcornSound services and features (e.g., e-mail or on-site forums). If you do not want to receive e-mail or other mail from us, please use your User Settings page to adjust your preferences. Opting out of emails may prevent you from using some of PopcornSound’s features and functionality.</p>
                </li>
                <li className={style.li}>
                    <p >Advertising. Third-party advertisers may use your personal information to display interest-based ads for features, products, and services that might be of interest to you. PopcornSound does not use information that personally identifies you to display interest-based ads. Since users do not pay to access PopcornSound, interest-based advertising via third-party advertisers provides revenue critical to enable the provision of PopcornSound services. You may customize your ad choices via Ad settings (click the icon next to the ad) or consumer opt out services, like the one provided by <Link className={style.link} href="http://www.networkadvertising.org/choices/">NAI</Link>.</p>
                </li>
                <li className={style.li}>
                    <p >Fraud Prevention. We use personal information to prevent and detect fraud and abuse of PopcornSound’s services.</p>
                </li>
                <li className={style.li}>
                    <p >Comply with legal obligations. In certain cases, we collect and use your personal information to comply with laws.</p>
                </li>
            </ul>
            <br/><br/>
            <h3 className={style.h3}>What About Cookies and Other Identifiers?</h3>
            <p >We use cookies, pixels, and other similar technologies (collectively “cookies”) to recognize your browser or device, learn more about your interests, and provide you with essential features and services and for additional purposes, including:</p>
            <ul className={style.ul}>
                <li className={style.li}>
                    <p >Recognizing you when you sign-in to our services. This allows us to provide you with content recommendations, display personalized content, and provide other customized features and services.</p>
                </li>
                <li className={style.li}>
                    <p >Keeping track of your preferences, as defined in your user account settings.</p>
                </li>
                <li className={style.li}>
                    <p >Conducting research and diagnostics to improve PopcornSound’s content and services.</p>
                </li>
                <li className={style.li}>
                    <p >Preventing fraudulent activity.</p>
                </li>
                <li className={style.li}>
                    <p >Improving security.</p>
                </li>
                <li className={style.li}>
                    <p >Delivering content.</p>
                </li>
                <li className={style.li}>
                    <p >Reporting. This allows us to measure and analyze the performance of our services.</p>
                </li>
                <li className={style.li}>
                    <p >Additionally, third-party advertising partners may utilize cookies in the delivery of interest-based advertising.</p>
                </li>
            </ul>
            <br/>
            <p >PopcornSound’s cookies allow you to take advantage of some of PopcornSound’s essential features. For instance, if you block or otherwise reject our cookies, you will not be able to contribute content, receive updates and notifications, or use any PopcornSound features that require you to sign in.</p>
            <br/>
            <p >Approved third parties may also set cookies when you interact with PopcornSound features. Third parties include providers of measurement and analytics services, social media networks, and advertising companies. Third-parties use cookies in the process of delivering content, including ads relevant to your interests, to measure the effectiveness of their ads, and to perform services on behalf of PopcornSound.</p>
            <br/>
            <p >You can manage browser cookies through your browser settings. The 'Help' feature on most browsers will tell you how to prevent your browser from accepting new cookies, how to have the browser notify you when you receive a new cookie, how to block cookies, and when cookies will expire. Hello trustpilot, confirming Songtradr owns this domain. If you block all cookies on your browser, neither we nor third parties will transfer cookies to your browser. If you do this, however, you may have to manually adjust some preferences every time you visit PopcornSound and some features and services may not work.</p>
            <br/><br/>
            <h3 className={style.h3}>Does PopcornSound Share Your Personal Information?</h3>
            <p >Our relationship with our users is a critical part of our business, and do not sell our users’ personal information to others.</p>
            <p >The only circumstances under which user personal information could potentially be shared would be the following:</p>
            <ul className={style.ul}>
                <li className={style.li}>
                    <p >Business Transfers: As we continue to develop our business, we might sell or buy other businesses or services. In such transactions, user information generally is one of the transferred business assets but remains subject to the promises made in any pre-existing Privacy Notice (unless, of course, the user consents otherwise). Also, in the event that PopcornSound, Inc. or substantially all of its assets are acquired, user information will of course be one of the transferred assets.</p>
                </li>
                <li className={style.li}>
                    <p >Protection of PopcornSound and Others: We release account and other personal information when we believe release is appropriate to comply with the law; enforce or apply our <Link className={style.link} href="https://www.PopcornSound.com/terms">Terms of Service</Link> and other agreements; or protect the rights, property, or safety of PopcornSound, our users, or others.</p>
                </li>
            </ul>
            <br/><br/>
            <h3 className={style.h3}>What About Advertising?</h3>
            <p >Third-Party Advertising and Links to Other Websites: PopcornSound may include third-party advertising and links to other websites and apps. Third-party advertising partners may collect information about you when you interact with their content, advertising, and services. This allows them to serve you with more useful and relevant ads and to measure their effectiveness. We do not provide your name or other information that directly identifies you to these advertisers or third-party websites. You may customize your ad choices via Ad settings (click the icon next to the ad) or consumer opt out services, like the one provided by <Link className={style.link} href="http://www.networkadvertising.org/choices/">NAI</Link>.</p>
            <p >Ad networks and analytics companies generally try to build viewer profiles to better target their advertising and/or improve their web traffic analyses. On this website, this includes Publisher First, Inc. To find out more about their privacy policy, visit: <Link className={style.link} href="https://freestar.com/data-policy/">Privacy Policy - Freestar</Link></p>
            <br/><br/>
            <h3 className={style.h3}>How Secure Is Information About Me?</h3>
            <p >We design our systems with your security and privacy in mind.</p>
            <ul className={style.ul}>
                <li className={style.li}>
                    <p >We collect only the bare minimum information about you required to provide core PopcornSound services and prevent fraud on the PopcornSound website.</p>
                </li>
                <li className={style.li}>
                    <p >We work to protect the security of your personal information during transmission by using encryption protocols and software.</p>
                </li>
                <li className={style.li}>
                    <p >It is important for you to protect against unauthorized access to your password and to your computers, devices, and applications. Be sure to sign off when finished using a shared computer.</p>
                </li>
            </ul>
            <br/><br/>
            <h3 className={style.h3}>What Choices Do I Have?</h3>
            <p >If you have any questions as to how we collect and use your personal information, please contact privacy [at] PopcornSound [dot] com.</p>
            <ul className={style.ul}>
                <li className={style.li}>
                    <p >As described above, you can choose not to provide certain information, but then you might not be able to take advantage of many of PopcornSound’s features.</p>
                </li>
                <li className={style.li}>
                    <p >If you do not want to receive e-mail or other communications from us, please log in to your account and adjust your preferences in your user account settings.</p>
                </li>
                <li className={style.li}>
                    <p >If you do not want to see interest-based ads, you may customize your ad choices via Ad settings (click the icon next to the ad) or consumer opt out services, like the one provided by <Link className={style.link} href="http://www.networkadvertising.org/choices/">NAI</Link>.</p>
                </li>
                <li className={style.li}>
                    <p >The Help feature on most browsers and devices will tell you how to prevent your browser or device from accepting new cookies or other identifiers, how to have the browser notify you when you receive a new cookie, or how to block cookies altogether. Because cookies allow you to take advantage of some essential PopcornSound features, we recommend that you leave them turned on.</p>
                </li>
            </ul>
            <br/><br/>
            <h3 className={style.h3}>Are Children Allowed to Use PopcornSound?</h3>
            <p >PopcornSound is not intended for use by children under the age of 13. If you are under 13, you may not sign up for PopcornSound or submit information about yourself to PopcornSound.</p>
            <br/><br/>
            <h3 className={style.h3}>California Consumer Privacy Act</h3>
            <p >Click <Link className={style.link} href="https://www.popcornsound.com/privacy">here</Link> to read additional disclosures required under the California Consumer Privacy Act.</p>
            <br/><br/>
            <h3 className={style.h3}>Conditions of Use, Notices, and Revisions</h3>
            <p >If you choose to use PopcornSound, your use and any dispute over privacy is subject to this Notice and our <Link className={style.link} href="https://www.PopcornSound.com/terms">Terms of Service</Link>, including limitations on damages, resolution of disputes, and application of the law of the state of California.</p>
            <br/>
            <p >If you have any concern about privacy at PopcornSound, please contact privacy [at] PopcornSound [dot] com and we will try to resolve it.</p>
            <br/>
            <p >As our business changes, our Privacy Notice may also change. You should check our website regularly to see recent changes. Unless stated otherwise, our current Privacy Notice applies to all information that we have about you and your account. We stand behind the promises we make, however, and will never materially change our policies and practices to make them less protective of customer information collected in the past without the consent of affected customers.</p>
        </div>
        </div>
    </div>
  );
}



export default function () {
  return (
    <div>
      <Head>
        <title>Soundtrack form Movies & TVShows | Popcornsound</title>
        <meta name="description" content="Discover the perfect soundtrack for every moment at Popcorn Sound – your ultimate destination for cinematic and immersive audio experiences. Explore a vast collection of handpicked soundtracks that elevate your emotions, whether you're watching a movie, playing a game, or simply enjoying life's moments. From epic orchestral scores to soulful melodies, find the right sound to complement your journey. Dive into the world of soundtracks with Popcorn Sound today." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:description" content="Discover the perfect soundtrack for every moment at Popcorn Sound – your ultimate destination for cinematic and immersive audio experiences. Explore a vast collection of handpicked soundtracks that elevate your emotions, whether you're watching a movie, playing a game, or simply enjoying life's moments. From epic orchestral scores to soulful melodies, find the right sound to complement your journey. Dive into the world of soundtracks with Popcorn Sound today." />
        <meta property="og:image" content="https://popcornsound.com/cover_popcorn_sound.png" />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:creator" content="@PopcornSound" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://popcornsound.com" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <LayOutDefault child={<Privacy />} currentRoute="Privacy" isSearch={true}/>
    </div>
  )
}
