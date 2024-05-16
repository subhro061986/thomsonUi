import React, { useEffect, useState, } from "react";
import TopBarSouthsore from "../Layout/TopBarSouthsore";
import NavBarSouthsore from "../Layout/NavBarSouthsore";
import FooterSouthsore from "../Layout/FooterSouthsore";
import Config from "../Config/Config.json"
import { Link } from "react-router-dom";
import Whatsapp from "../Layout/Whatsapp";

const TermsScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleClick = () => {
    // Navigate to the footer component
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'auto'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
  });
  };

  return (
    <div className="main-container">
      <div className="container">
        <TopBarSouthsore />
        <NavBarSouthsore />
      </div>
      <Whatsapp/>
      <div className="about-southshore py-5" style={{backgroundColor:'#F7F8FA',paddingLeft:'8%',paddingRight:'8%', marginTop:'1%'}}>
            <div className="row">
                <div className="col-md-12 cert_l_col">
                    <div className="about-southshore-header">
                        <div className="d-flex justify-content-between" style={{width:'100%'}}>
                            <h4>Terms & Conditions</h4>
                            <button className="btn btn-primary" onClick={handleClick}>Back</button>
                        </div>
                    </div>
                    <div className="about-southshore-body">
                        <p className="mt-5">Southshore Innovations Private Limited owner of the 
                        e-commerce marketplace for digital content <Link to={Config.home_links} className="home_nav_link">(www.ebooksjunction.com)</Link> is willing to 
                        license the licensed software to you as the individual, the company, or the legal entity that 
                        will be utilizing the licensed software (referenced below as “you” or “your”) only on the condition 
                        that you accept all of the terms of this license agreement (“license agreement”). 
                        Read the terms and conditions of this license agreement carefully before using the 
                        licensed software. 
                        This is a legal and enforceable contract between you and 
                        SOUTHSHORE INNOVATIONS PRIVATE LIMITED, and by clicking the 
                        “I AGREE” or “YES” button, or otherwise indicating assent electronically or downloading the 
                        licensed software or otherwise using the licensed software, you agree to the terms and conditions 
                        of this license agreement. If you do not agree to these terms and conditions, 
                        click the “I DO NOT AGREE” or “NO” button or otherwise indicate refusal and make no use of the 
                        licensed software. 
                        The terms and conditions of this license are specifically incorporated by this reference into 
                        your quote or purchase order unless specifically amended by a mutually executed software license 
                        agreement or other writing signed by you and SOUTHSHORE INNOVATIONS PRIVATE LIMITED. 
                        UNLESS OTHERWISE DEFINED HEREIN, CAPITALIZED TERMS WILL HAVE THE MEANING GIVEN IN THE “DEFINITIONS” 
                        SECTION OF THIS LICENSE AGREEMENT AND SUCH CAPITALIZED TERMS MAY BE USED IN THE SINGULAR OR IN THE 
                        PLURAL, AS THE CONTEXT MAY REQUIRE.
                        </p>

                        <p className="mt-2">However, it must be made clear in unambiguous words that 
                          Southshore Innovations Private Limited shall not be responsible for availability 
                          of the personal information of its user in any other public domain.
                        </p>

                        

                        <h6>1. DEFINITIONS</h6>

                        <p className="mt-2">
                          “Documentation” means the user documentation SOUTHSHORE INNOVATIONS PRIVATE LIMITED provides 
                          with the Licensed Software, if any.
                        </p>

                        <p className="mt-2">“License Instrument” means one or more of the following applicable documents which 
                        further defines your license rights to the Licensed Software: a Software License Agreement or a 
                        similar license document issued by SOUTHSHORE INNOVATIONS PRIVATE LIMITED, or a 
                        written agreement between you and SOUTHSHORE INNOVATIONS PRIVATE LIMITED, 
                        that accompanies, precedes or follows this License Agreement.
                        </p>

                        <p className="mt-2">“Licensed Software” means the software product provided to you by 
                        SOUTHSHORE INNOVATIONS PRIVATE LIMITED on download accompanying this License Agreement as 
                        identified in your Quote or Purchase Order, including any Documentation included in, 
                        or provided for use with, such software or that accompanies this License Agreement.
                        </p>

                        <p className="mt-2">“Support Certificate” means the certificate sent by 
                          SOUTHSHORE INNOVATIONS PRIVATE LIMITED, if any, 
                          confirming your purchase of the applicable SOUTHSHORE INNOVATIONS PRIVATE LIMITED 
                          maintenance/support for the Licensed Software.
                        </p>

                        <p className="mt-2">“Upgrade” means any version of the Licensed Software that has been 
                        released to the public and which replaces the prior version of the Licensed Software 
                        on SOUTHSHORE INNOVATIONS’s price list pursuant to SOUTHSHORE INNOVATIONS’s then-current upgrade policies.
                        </p>

                        <h6>2. LICENSE GRANT</h6>

                        <p className="mt-2">Subject to your compliance with the terms and conditions of this 
                        License Agreement, SOUTHSHORE INNOVATIONS PRIVATE LIMITED grants to you the following rights: 
                        (i) a non-exclusive, non-transferable license to use the Licensed Software solely in 
                        support of your internal business operations in the quantities depicted in your 
                        Quote or Purchase Order and as further described in this License Agreement and the applicable 
                        License Instrument (if any); and (ii) the right to make a single uninstalled copy of the 
                        Licensed Software for archival purposes which you may use and install for disaster-recovery purposes 
                        (i.e. where the primary installation of the Licensed Software becomes unavailable for use).
                        </p>

                        <h6>3. TERM</h6>

                        <p className="mt-2">The term of the Licensed Software license granted under this 
                        License Agreement shall be as indicated in your Quote or Purchase Order, 
                        the Effective Date of this License Agreement shall be the date You download the Licensed Software, 
                        clicking “I Agree” or the “Yes” buttons if downloaded from our website/url. 
                        License Agreement shall be renewed automatically for consecutive annual terms 
                        unless terminated by the Parties consistent herewith. 
                        If you have obtained the Licensed Software for a fixed term, 
                        your rights to use such Licensed Software shall end on the applicable end date as 
                        indicated in your Quote or Purchase Order and you shall cease use of the 
                        Licensed Software as of such applicable end date.
                        </p>

                        <h6>4. LICENSE RESTRICTIONS</h6>

                        <p className="mt-2">You may not, without the prior written consent of 
                        SOUTHSHORE INNOVATIONS PRIVATE LIMITED, conduct, cause or permit the: (i) use, 
                        copying, modification, rental, lease, sublease, sublicense, or transfer of the Licensed Software 
                        except as expressly provided in this License Agreement; 
                        (ii) creation of any derivative works based on the Licensed Software; 
                        (iii) reverse engineering, disassembly, or decompiling of the Licensed Software; 
                        (iv) use of the Licensed Software in connection with service bureau, 
                        facility management, timeshare, service provider or like activity whereby you operate or use the 
                        Licensed Software for the benefit of a third party; 
                        (v) use of the Licensed Software by any party other than you; 
                        (vi) use of a later version of the Licensed Software other than the version that 
                        accompanies this License Agreement unless you have separately acquired the right to use such 
                        later version through a License Instrument or Support Certificate; nor 
                        (vii) use of the Licensed Software above the quantity and Use Level that have been 
                        licensed to you under this License Agreement or the applicable License Instrument.
                        </p>
                        <h6>5. OWNERSHIP/TITLE</h6>
                        <p className="mt-2">The Licensed Software is the proprietary property of 
                        SOUTHSHORE INNOVATIONS PRIVATE LIMITED and is protected by copyright law. 
                        SOUTHSHORE INNOVATIONS PRIVATE LIMITED retain any and all rights, 
                        title and interest in and to the Licensed Software, including in all copies, 
                        improvements, enhancements, modifications and derivative works of the Licensed Software. 
                        Your rights to use the Licensed Software shall be limited to those expressly granted in 
                        this License Agreement. All rights not expressly granted to you are retained by 
                        SOUTHSHORE INNOVATIONS PRIVATE LIMITED and/or its licensors. 
                        </p>

                        <h6>6. CONTENT UPDATES</h6>
                        <p className="mt-2">This License Agreement does not otherwise grant you the right to obtain and 
                        use Content Updates. In its sole discretion, 
                        SOUTHSHORE INNOVATIONS PRIVATE LIMITED reserves the right to release any patch or update for 
                        its users either free of cost or at cost.
                        </p>

                        <h6>7. WARRANTY DISCLAIMERS</h6>
                        <p className="mt-2">YOU EXPRESSLY ACKNOWLEDGE THAT USE OF THE PRODUCT IS AT YOUR OWN RISK. 
                        TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, 
                        THE PRODUCT IS SUPPLIED ON AN “AS IS” AND “AS AVAILABLE“BASIS. 
                        SOUTHSHORE INNOVATIONS PRIVATE LIMITED DOES NOT MAKE AND HEREBY DISCLAIM ANY GUARANTEES, 
                        CONDITIONS, WARRANTIES OF ANY KIND, EXPRESS, IMPLIED OR STATUTORY OR OTHER TERMS INCLUDING AS TO: 
                        (A) ITS CONFORMITY, ACCURACY, CORRECTNESS, COMPLETENESS, RELIABILITY OR SECURITY 
                        (B) ITS SUITABILITY FOR A PARTICULAR USE; 
                        (C) IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT; 
                        (D) ITS MARKET VALUE; OR 
                        (E) YOUR SATISFACTION. SOUTHSHORE INNOVATIONS PRIVATE LIMITED DOES NOT WARRANT THAT 
                        THE PRODUCT WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, 
                        OR THAT THE PRODUCT IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. 
                        YOU ASSUME ALL RESPONSIBILITY FOR SELECTING THE PRODUCT TO ACHIEVE YOUR INTENDED RESULTS, 
                        AND FOR THE INSTALLATION OF, USE OF, AND RESULTS OBTAINED FROM THE PRODUCT. 
                        ALSO OUTPUT / PERFORMANCE OF THE PRODUCT MAY GET AFFECTED BY RESTRICTION IMPOSED BY
                        WORDWIDE WEBSITE PERTAINING TO FETCHING OF DATA FROM SUCH PORTAL. 
                        SOUTHSHORE INNOVATIONS PRIVATE LIMITED SHALL NOT BE RESPONSIBLE FOR RESTRICTIONS, 
                        IN ANY MANNER WHATSOEVER.
                        </p>

                        <h6>8. LIMITATION OF LIABILITY</h6>
                        <p className="mt-2">TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, IN NO EVENT WILL SOUTHSHORE INNOVATIONS PRIVATE LIMITED, 
                        IT’S LICENSORS, CHANNEL PARTNERS AND ASSOCIATED SERVICE PROVIDERS BE LIABLE FOR LOSS OR DAMAGE SUFFERED 
                        IN CONNECTION WITH THE USE OF THE PRODUCT. THIS INCLUDES WITHOUT LIMITATION 
                        (A) ALL LOSSES OF ANY KIND, WHETHER IN TORT (INCLUDING FOR NEGLIGENCE OR BREACH OF STATUTORY DUTY), 
                        CONTRACT, MISREPRESENTATION (WHETHER INNOCENT OR NEGLIGENT) OR OTHERWISE, 
                        (B) DIRECT LOSS; (C) ACCIDENTAL LOSS, (D) INCIDENTAL LOSS, (E) CONSEQUENTIAL LOSS, AND 
                        (F) INDIRECT LOSS. NOTWITHSTANDING THE AFOREMENTIONED LIMITATIONS OF LIABILITY, 
                        YOUR SOLE REMEDY IN THE EVENT OF A DISPUTE WITH SOUTHSHORE INNOVATIONS PRIVATE LIMITED OR ITS LICENSORS, 
                        CHANNEL PARTNERS AND ASSOCIATED SERVICE PROVIDERS IS TO CEASE TO USE THE PRODUCT; AND IF APPLICABLE, 
                        SEEK DAMAGES FOR YOUR LOSSES. FOR ANY PRODUCT PURCHASED FOR USE ON A COMPATIBLE MOBILE TERMINAL THAT WOULD NOT 
                        MEET THE APPLICABLE LEGAL WARRANTIES, THE LIABILITY OF SOUTHSHORE INNOVATIONS PRIVATE LIMITED IS 
                        LIMITED TO THE REFUND (DIRECTLY OR INDIRECTLY THROUGH ITS CHANNEL PARTNERS OR ASSOCIATED SERVICE PROVIDERS) 
                        OF THE PURCHASE PRICE OF THE PRODUCT. IN NO EVENT SOUTHSHORE INNOVATIONS, ITS AFFILIATES, LICENSORS, CHANNEL 
                        PARTNERS AND ASSOCIATED SERVICE PROVIDERS BE LIABLE FOR DAMAGES IN EXCESS OF ANY AMOUNT YOU HAVE PAID TO 
                        SOUTHSHORE INNOVATIONS PRIVATE LIMITED FOR PURCHASE OF THE PRODUCT. THE FOREGOING IS YOUR SOLE AND 
                        EXCLUSIVE REMEDY AGAINST ANY BREACH OF THIS WARRANTY BY SOUTHSHORE INNOVATIONS PRIVATE LIMITED.
                        </p>

                        <h6>9. EXPORT REGULATION</h6>
                        <p className="mt-2">You acknowledge that the Licensed Software and related 
                        technical data and services (collectively "Controlled Technology") 
                        are subject to the import and export laws of INDIA and the laws of any country where 
                        Controlled Technology is imported or re-exported. You agree to comply with all relevant 
                        laws and will not export any Controlled Technology in contravention to prevailing 
                        law nor to any prohibited country, entity, or person for which an export license or other 
                        governmental approval is required.
                        </p>

                        <h6>10. TERMINATION</h6>
                        <p className="mt-2">For Convenience. Either Party may terminate this License Agreement or 
                        any Order in part or in its entirety at any time for convenience upon thirty 
                        (30) days’ prior written notice to the other Party. 
                        In the event Customer terminates for convenience, 
                        no refund of Fees paid or payable under your Quote, Order or this License Agreement 
                        shall be payable from SOUTHSHORE INNOVATIONS PRIVATE LIMITED. For Cause. 
                        Either party may terminate this License Agreement or Order following written notice to the 
                        other party where the other Party has failed to cure a material breach, after having been 
                        given written notice of the material breach and thirty (30) days following receipt of said 
                        written notice to cure the material breach. In the case of a Termination for Cause, 
                        SOUTHSHORE INNOVATIONS PRIVATE LIMITED shall refund to Customer all pre-paid unused fees the 
                        Licensed Product or services up to the date of the uncured material breach. Upon termination, 
                        you shall immediately stop using and destroy all copies of the Licensed Software.
                        </p>

                        <h6>11. GENERAL</h6>
                        <p className="mt-2"><b>ASSIGNMENT.</b> 
                        You may not assign the rights granted hereunder or 
                        this License Agreement, in whole or in part and whether by operation of contract, 
                        law or otherwise, without THE PRIOR WRITTEN CONSENT OF SOUTHSHORE INNOVATIONS PRIVATE LIMITED.
                        </p>

                        <p className="mt-2"><b>COMPLIANCE WITH APPLICABLE LAW.</b> 
                        You are solely responsible for your compliance with, 
                        and you agree to comply with, all applicable laws, rules, and regulations in 
                        connection with your use of the Licensed Software.
                        </p>

                        <p className="mt-2"><b>GOVERNING LAW; SEVERABILITY; WAIVER.</b> 
                        This License Agreement will be governed by the laws of INDIA. 
                        If any provision of this License Agreement is found partly or wholly 
                        illegal or unenforceable, such provision shall be enforced to the maximum extent permissible, 
                        and remaining provisions of this License Agreement shall remain in full force and effect. 
                        A waiver of any breach or default under this License Agreement shall not constitute a waiver of 
                        any other subsequent breach or default.
                        </p>

                        <p className="mt-2"><b>THIRD PARTY PROGRAMS.</b> 
                        This Licensed Software may contain third party software programs 
                        (“Third Party Programs”) that are available under open source or free software licenses. 
                        This License Agreement does not alter any rights or obligations you may have under 
                        those open source or free software licenses. Notwithstanding anything to the contrary 
                        contained in such licenses, the disclaimer of warranties and the limitation of liability 
                        provisions in this License Agreement shall apply to such Third-Party Programs as well.
                        </p>

                        <p className="mt-2"><b>ENTIRE AGREEMENT.</b> 
                        This License Agreement and any related License Instrument are the complete and exclusive agreement 
                        between you and SOUTHSHORE INNOVATIONS PRIVATE LIMITED relating to the Licensed Software and shall 
                        be binding on you on or after download of the software. 
                        This License Agreement prevails over any conflicting or additional terms of any purchase order, 
                        ordering document, acknowledgement or confirmation or other document issued by you, even 
                        if signed and returned. This License Agreement may only be modified by a License Instrument that 
                        accompanies or follows this License Agreement.
                        </p>

                        <p className="mt-2">
                          For any queries / clarifications please reach us at compliance@southshore.in
                        </p>

                        

                    </div>
                </div>
                
            </div>
            
        </div>
      <div id="contact">
        <FooterSouthsore/>
      </div>
    </div>
  );
}

export default TermsScreen;