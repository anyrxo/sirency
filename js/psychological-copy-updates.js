/**
 * Psychological Copy Updates
 * Curiosity-based, emotionally compelling copy for female creators
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    updateCopy();
  }

  function updateCopy() {
    // Hero Section
    updateTextContent('.herosection .heading-80', 'What if Your Next Post Could Change Everything?');
    updateTextContent('.herosection .sunheading-20', 'Discover the Secret Top Creators Use to Turn Attention into Income');

    // Instagram CTA Section
    updateTextContent('.instagram-eps .section-heading', 'Ever Wonder How They Make It Look So Easy?');
    updateButtonText('.instagram-eps .button-primary', 'Show Me How');

    // How We Work Section
    updateHTML('.howwework .heading-80.v4', 'The Method <span class="text-span-3">They Don\'t Want You to Know</span>');

    updateTextContent('.howwework .div-block-10:first-child .heading-86', 'You\'re One System Away from Freedom');
    updateHTML('.howwework .div-block-10:first-child .pricetext',
      'What if you could wake up to thousands in your account—without burning out? While others guess, our creators know exactly what works. We handle every message, every post, every strategy that turns your content into consistent income. <strong>You stay creative. We make you profitable.</strong>');

    updateTextContent('.howwework .div-block-10:last-child .heading-86', 'They\'re Watching. Are You Ready to Be Unforgettable?');
    updateHTML('.howwework .div-block-10:last-child .pricetext',
      'Your audience is out there right now—scrolling, searching, waiting for someone like you. We don\'t just post content. We engineer desire. Every platform, every algorithm, every move designed to make them obsessed with you. Not just followers. <em>Paying fans who stay.</em>');

    // Power of SirenCY Section
    updateHTML('.powersection .heading-81', 'Why Some Creators Win <span class="text-span">While Others Just Work Harder</span>');

    updateHTML('.powersection .heading-82',
      '<span class="text-span-5">Ever notice how some creators seem to effortlessly make six figures while you\'re grinding for pennies? It\'s not luck. It\'s not looks. It\'s the <em>system.</em><br><br>Most agencies treat you like a number. We treat you like the brand you\'re meant to be. While they chase viral moments, we build machines that print money. Every TikTok, every DM, every click—engineered to convert.</span><span></span><span class="text-span-6"><br><br>In December 2023, we didn\'t just improve. We <strong>rebuilt everything.</strong> The result? Our creators don\'t have "good months" and "bad months" anymore. They have <em>predictable, bankable growth.</em> Every. Single. Month.</span><span></span><span><br><br>This isn\'t about working harder. It\'s about knowing what works. <strong>And we know.</strong></span>');

    // For Creator Elite Section
    updateTextContent('.creatorwrap .heading1', 'You\'re Not Like Everyone Else. Your Strategy Shouldn\'t Be Either.');
    updateHTML('.creatorwrap .text1',
      'What if your content could open doors you didn\'t even know existed? We don\'t just grow your OnlyFans—we position you as an <em>icon.</em> Exclusive brand partnerships. VIP opportunities. A network of success that extends far beyond the platform. This is where creators become legends.');

    // Member Access CTA
    updateTextContent('.memberaccess .heading2.heading', 'What Would Change if You Finally Knew the Formula?');
    updateButtonText('.memberaccess .button-primary', 'I\'m Ready');

    // Results Section
    updateHTML('.trip-around .heading-87', 'Proof It Works <span class="text-span-4">(Even If You\'re Starting from Zero)</span>');
    updateTextContent('.trip-around .paragraph', 'These Creators Were Exactly Where You Are Right Now.');

    // Testimonial
    updateTextContent('.memberaccess.member-access-2 .heading2',
      '"I almost gave up. Then I found SirenCY—and everything changed. If you\'re tired of wasting time with agencies that overpromise and underdeliver, this is your sign. They don\'t just talk about results. They deliver them. Every single time."');

    // Before/After Section
    updateTextContent('.before-after .heading-88', 'From Invisible to Unstoppable');

    // Case Studies
    updateButtonText('.casestudies .button-primary', 'Show Me How');

    // Case Study 1 - Chelsea
    updateTextContent('.subfee .feewrap.freewap-trial:nth-child(1) .priceheading.priceheading2', 'She Started with Nothing. Now She Makes $130k/Month.');
    updateTextContent('.subfee .feewrap.freewap-trial:nth-child(1) .pricetext:first-of-type', 'Chelsea: From Zero to Icon');

    updateTextContent('.subfee .feewrap.freewap-trial:nth-child(1) .divblock1:first-of-type .priceheading', 'Strategy');
    updateHTML('.subfee .feewrap.freewap-trial:nth-child(1) .divblock1:first-of-type .pricetext',
      'Chelsea had zero followers. Zero strategy. Zero idea where to start. Sound familiar?<br><br>We gave her the exact system our top earners use—the one most agencies keep secret. No paid ads. No guesswork. Just proven, repeatable tactics that turn views into dollars.<br><br>Within months: <strong>$130K/month.</strong> And she\'s still growing.<br><br>The difference? A system that works whether you\'re brand new or already established.');

    updateTextContent('.subfee .feewrap.freewap-trial:nth-child(1) .divblock1:last-of-type .priceheading', 'Chelsea\'s Testimonial');
    updateHTML('.subfee .feewrap.freewap-trial:nth-child(1) .divblock1:last-of-type .pricetext',
      '"I thought I was too late. Everyone told me the market was saturated. Then SirenCY showed me what actually works. Now I\'m making more in a month than I used to make in a year—and I\'m just getting started. If you\'re on the fence, this is your sign. Stop waiting. Start winning."');

    // Case Study 2 - Anonymous
    updateTextContent('.subfee .feewrap.free-trial-2 .priceheading.priceheading2', '3,000 New Subscribers Every Week. Here\'s How.');
    updateTextContent('.subfee .feewrap.free-trial-2 .pricetext:first-of-type', 'From Broken Funnels to Unstoppable Growth');

    updateHTML('.subfee .feewrap.free-trial-2 .divblock1:first-of-type .pricetext',
      'She was doing everything "right"—posting consistently, engaging with fans, trying every tip from YouTube gurus. But nothing converted.<br><br>Here\'s the truth most people don\'t tell you: <strong>Effort ≠ Results.</strong> Strategy does.<br><br>We rebuilt her entire funnel from scratch. Optimized her content. Fixed what was broken. One week later? <strong>3,000 new paid subscribers.</strong> Every. Single. Week.<br><br>This isn\'t magic. It\'s method.');

    updateHTML('.subfee .feewrap.free-trial-2 .divblock1:last-of-type .pricetext',
      '"Before SirenCY, I was exhausted and broke. I thought <em>I</em> was the problem. Turns out, my strategy was. They fixed what I couldn\'t see—and now I\'m gaining thousands of subs weekly. If you\'re working hard but not seeing results, you need this. Trust me."');

    // Case Study 3 - Ruby
    updateTextContent('.subfee .feewrap.free-trial-3 .priceheading.priceheading2', 'A New Subscriber Every 60 Seconds. Yes, Really.');
    updateTextContent('.subfee .feewrap.free-trial-3 .pricetext:first-of-type', 'Ruby\'s Explosive Growth Story');

    updateHTML('.subfee .feewrap.free-trial-3 .divblock1:first-of-type .pricetext',
      'Ruby almost quit. Her last agency left her with broken funnels and crushed confidence. She didn\'t know if it was even possible anymore.<br><br>Then we rebuilt everything. From the ground up. New strategy. New systems. New results.<br><br>Now? <strong>A new subscriber every single minute.</strong><br><br>Not luck. Not virality. A system that doesn\'t stop working.');

    updateHTML('.subfee .feewrap.free-trial-3 .divblock1:last-of-type .pricetext',
      '"My last agency made me feel like a failure. SirenCY made me feel unstoppable. Every minute—literally every minute—I see new subscribers. I didn\'t think this was possible. I was wrong. And I\'ve never been happier to be wrong."');

    // Location Section
    updateHTML('.location .pricetext.v2.v3',
      'Imagine Opening Your Phone and Seeing Thousands You Earned While You Slept. That\'s Not a Fantasy. That\'s What Our Creators Wake Up To.');
    updateButtonText('.location .button-primary', 'Let\'s Do This');

    // All remaining "Apply Now" buttons
    updateAllButtonText('I\'m Ready');
  }

  function updateTextContent(selector, newText) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = newText;
    }
  }

  function updateHTML(selector, newHTML) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = newHTML;
    }
  }

  function updateButtonText(selector, newText) {
    const button = document.querySelector(selector);
    if (button) {
      button.textContent = newText;
    }
  }

  function updateAllButtonText(newText) {
    const buttons = document.querySelectorAll('.button-primary');
    buttons.forEach(button => {
      // Only update if it currently says "Apply now" or "Apply Now"
      if (button.textContent.trim().toLowerCase().includes('apply')) {
        button.textContent = newText;
      }
    });
  }
})();
